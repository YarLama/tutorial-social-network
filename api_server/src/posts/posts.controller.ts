import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create_post.dto';
import { UpdatePostDto } from './dto/update_post.dto';
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

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updatePost(@Body() dto: UpdatePostDto, @Param('id') id: number, @UploadedFile() image){
        return this.postService.updatePost(dto, id, image);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: number) {
        return this.postService.removePostHard(id);
    }
}
