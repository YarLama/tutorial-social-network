import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create_post.dto';
import { UpdatePostDto } from './dto/update_post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ) {}

    async createPost(dto: CreatePostDto, image: any) {
        if(image) {
            const fileName = await this.fileService.createFileImage(image);
            const post = await this.postRepository.create({...dto, image: fileName})
            return post;
        }
        const post = await this.postRepository.create({...dto})
        return post;
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findByPk(id);
        if (post) return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({include: {all: true}});
        return posts;
    }

    async updatePost(dto: UpdatePostDto, id: number, image: any) {
        const post = await this.postRepository.findByPk(id);
        if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        let fileName = post.image;
        const imageCondition = (image !== null && image !== undefined);
        fileName = imageCondition ? await this.fileService.createFileImage(image) : null;

        const updatePost = await this.postRepository.update(
            {...dto, image: fileName},
            {where: {id}}
        );
        const updatedPost = await this.postRepository.findByPk(id);
        return updatedPost;
    }

    async removePostHard(id: number) {
        const post = await this.postRepository.findByPk(id);
        const response = { postId: post.id, message: "Remove success."}
        if (post) {
            const removedPost = await this.postRepository.destroy({where : {id}});
            if (!removedPost) return {...response, message: "Remove error"}
            return response;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
}
