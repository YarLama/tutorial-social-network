import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create_post.dto';
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

    async getPostBy(id: number) {
        const post = await this.postRepository.findByPk(id);
        if (post) return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async DeletePostHard(id: number) {
        const post = await this.postRepository.findByPk(id);
        if (post) return this.postRepository.destroy({where : {id}})
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
}
