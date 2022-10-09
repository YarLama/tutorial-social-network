import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { RoleNames } from 'src/utils/constants';
import { CreateLikesCommentDto } from './dto/create_likes_comment.dto';
import { CreateLikesPostDto } from './dto/create_likes_post.dto';
import { LikesService } from './likes.service';
@Controller('/api/likes')
export class LikesController {
    
    constructor(private likesService: LikesService) {

    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post('/post/')
    createLikePost(@Body() dto: CreateLikesPostDto){
        return this.likesService.createLikePost(dto);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post('/comment/')
    createLikeComment(@Body() dto: CreateLikesCommentDto){
        return this.likesService.createLikeComment(dto);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/posts/')
    getAllLikesPost(){
        return this.likesService.getAllLikesPost();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/comments/')
    getAllLikesComment(){
        return this.likesService.getAllLikesComment();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/comment/:id')
    getCommentLikes(@Param('id') id: number) {
        return this.likesService.getLikesByCommentId(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/post/:id')
    getPostLikes(@Param('id') id: number) {
        return this.likesService.getLikesByPostId(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/post/user/:userid')
    getUserPostLikes(@Param('userid') userId: number) {
        return this.likesService.getPostLikesByUser(userId);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/comment/user/:userid')
    getUserCommentLikes(@Param('userid') userId: number) {
        return this.likesService.getCommentLikesByUser(userId);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/comment/:id')
    removeCommentLikes(@Param('id') id: number) {
        return this.likesService.removeCommentLikeHard(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/post/:id')
    removePostLikes(@Param('id') id: number) {
        return this.likesService.removePostLikeHard(id);
    }

}
