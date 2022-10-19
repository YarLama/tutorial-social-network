import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { LikesPost } from 'src/likes/likes_posts.model';
import { getImageBuffer, isImageExist, removeLocalImage } from 'src/utils/fs_functions';
import { CreatePostDto } from './dto/create_post.dto';
import { UpdatePostDto } from './dto/update_post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private authService: AuthService,
        private fileService: FilesService
    ) {}

    async createPost(dto: CreatePostDto, image: any, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        if(image) {
            const fileName = await this.fileService.createFileImage(image);
            const post = await this.postRepository.create({...dto, image: fileName})
            return post;
        }
        const post = await this.postRepository.create({...dto})
        return post;
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findByPk(id, {
            include: {
                model: LikesPost
            }
        });
        if (post) return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({include: {all: true}});
        return posts;
    }

    async updatePost(dto: UpdatePostDto, id: number, image: any, request: Request) {
        const post = await this.postRepository.findByPk(id);
        if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, post.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        
        const image_exist = await isImageExist(post.image);
        let fileName: string | null;
        
        if (image_exist && image) {
            const image_exist_buffer = await getImageBuffer(post.image);
            const buffer_compare_result = Buffer.compare(image.buffer, image_exist_buffer);
            if (buffer_compare_result === 0) {
                const updatePostWithoutImage = await this.postRepository.update(
                    {...dto},
                    {where: {id}}
                );
            } else {
                fileName = await this.fileService.createFileImage(image);
                const updatePost = await this.postRepository.update(
                    {...dto, image: fileName},
                    {where: {id}}
                );
                const removeFromDist = await removeLocalImage(post.image)
            }
        } else if (image_exist && image == null) {
            fileName = null;
            const updatePost = await this.postRepository.update(
                {...dto, image: fileName},
                {where: {id}}
            );
            const removeFromDist = await removeLocalImage(post.image)
        } else if (!image_exist && image == null) {
            const updatePostWithoutImage = await this.postRepository.update(
                {...dto},
                {where: {id}}
            );
        } else if (!image_exist && image) {
            fileName = await this.fileService.createFileImage(image);
            const updatePost = await this.postRepository.update(
                {...dto, image: fileName},
                {where: {id}}
            );
        }
        
        const updatePost = await this.postRepository.update(
            {...dto, image: fileName},
            {where: {id}}
        );
        const updatedPost = await this.postRepository.findByPk(id, {
            include: {
                model: LikesPost
            }
        });
        return updatedPost;
    }

    async removePostHard(id: number, request: Request) {
        const post = await this.postRepository.findByPk(id);
        if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, post.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const response = { postId: post.id, message: "Remove success."}
        const removedPost = await this.postRepository.destroy({where : {id}});
        const removeFromDist = await removeLocalImage(post.image)
        if (!removedPost) return {...response, message: "Remove error"}
        return response;
    }
}
