import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { RoleNames } from 'src/utils/constants';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Controller('/api/comments')
export class CommentsController {

    constructor(
        private commentService: CommentsService
    ) {}

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post()
    createComment(@Body() dto: CreateCommentDto, @Req() request: Request) {
        return this.commentService.createComment(dto, request);
    }

    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllComments() {
        return this.commentService.getAllComment();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getCommentById(@Param('id') id: number) {
        return this.commentService.getCommentById(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/post/:id')
    getPostCommentInfo(@Param('id') id: number, @Req() request: Request) {
        return this.commentService.getPostCommentInfo(id, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateComment(@Body() dto: UpdateCommentDto, @Param('id') id: number, @Req() request: Request){
        return this.commentService.updateComment(dto, id, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    removeComment(@Param('id') id: number, @Req() request: Request) {
        return this.commentService.removeCommentHard(id, request);
    }
}
