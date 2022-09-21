import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create_comment.dto';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Controller('/api/comments')
export class CommentsController {

    constructor(
        private commentService: CommentsService
    ) {}

    @Post()
    createComment(@Body() dto: CreateCommentDto) {
        return this.commentService.createComment(dto);
    }

    @Get()
    getAllComments() {
        return this.commentService.getAllComment();
    }

    @Get('/:id')
    getCommentById(@Param('id') id: number) {
        return this.commentService.getCommentById(id);
    }

    @Put('/:id')
    updateComment(@Body() dto: UpdateCommentDto, @Param('id') id: number){
        return this.commentService.updateComment(dto, id);
    }

    @Delete('/:id')
    removeComment(@Param('id') id: number) {
        return this.commentService.removeCommentHard(id);
    }
}
