import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { RoleNames } from 'src/utils/constants';
import { CreatePostDto } from './dto/create_post.dto';
import { UpdatePostDto } from './dto/update_post.dto';
import { PostsService } from './posts.service';

@Controller('/api/posts')
export class PostsController {

    constructor(private postService: PostsService) {

    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image, @Req() request: Request) {
        return this.postService.createPost(dto, image, request)
    }

    @RolesForAccess(RoleNames.USER, RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updatePost(@Body() dto: UpdatePostDto, @Param('id') id: number, @UploadedFile() image, @Req() request: Request){
        return this.postService.updatePost(dto, id, image, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deletePost(@Param('id') id: number, @Req() request: Request) {
        return this.postService.removePostHard(id, request);
    }
}
