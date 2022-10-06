import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLikesCommentDto } from './dto/create_likes_comment.dto';
import { CreateLikesPostDto } from './dto/create_likes_post.dto';
import { LikesService } from './likes.service';
@Controller('/api/likes')
export class LikesController {
    
    constructor(private likesService: LikesService) {

    }

    @Post('/post/')
    createLikePost(@Body() dto: CreateLikesPostDto){
        return this.likesService.createLikePost(dto);
    }

    @Post('/comment/')
    createLikeComment(@Body() dto: CreateLikesCommentDto){
        return this.likesService.createLikeComment(dto);
    }

    @Get('/posts/')
    getAllLikesPost(){
        return this.likesService.getAllLikesPost();
    }

    @Get('/comments/')
    getAllLikesComment(){
        return this.likesService.getAllLikesComment();
    }

    @Get('/comment/:id')
    getCommentLikes(@Param('id') id: number) {
        return this.likesService.getLikesByCommentId(id);
    }

    @Get('/post/:id')
    getPostLikes(@Param('id') id: number) {
        return this.likesService.getLikesByPostId(id);
    }


    @Get('/post/user/:userid')
    getUserPostLikes(@Param('userid') userId: number) {
        return this.likesService.getPostLikesByUser(userId);
    }

    @Get('/comment/user/:userid')
    getUserCommentLikes(@Param('userid') userId: number) {
        return this.likesService.getCommentLikesByUser(userId);
    }

    @Delete('/comment/:id')
    removeCommentLikes(@Param('id') id: number) {
        return this.likesService.removeCommentLikeHard(id);
    }

    @Delete('/post/:id')
    removePostLikes(@Param('id') id: number) {
        return this.likesService.removePostLikeHard(id);
    }

}
