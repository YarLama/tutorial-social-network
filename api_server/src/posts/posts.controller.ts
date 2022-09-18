import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create_post.dto';
import { PostsService } from './posts.service';

@Controller('/api/posts')
export class PostsController {

    constructor(private postService: PostsService) {

    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.createPost(dto, image)
    }

    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPostBy(id);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: number) {
        return this.postService.DeletePostHard(id);
    }
}
