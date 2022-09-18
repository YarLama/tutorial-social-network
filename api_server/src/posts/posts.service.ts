import { Injectable } from '@nestjs/common';
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

    async createPost(dto: CreatePostDto, attachment: any) {
        const fileName = await this.fileService.createFileImage(attachment);
        const post = await this.postRepository.create({...dto, image: fileName})
        return post;
    }
}
