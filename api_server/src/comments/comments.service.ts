import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create_comment.dto';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comment) private commentRepository: typeof Comment,
        private userService: UsersService,
        private authService: AuthService,
        private postService: PostsService
    ) {}

    async createComment(dto: CreateCommentDto, request: Request): Promise<Comment> {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user = await this.userService.getUserById(dto.userId);
        const post = await this.postService.getPostById(dto.postId);

        if (!user || !post) throw new HttpException('Post or user not found', HttpStatus.NOT_FOUND);

        const comment = this.commentRepository.create({...dto});
        return comment;
    }

    async getAllComment(): Promise<Comment[]> {
        const comments = this.commentRepository.findAll();
        return comments;
    }

    async getCommentById(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findByPk(id);

        if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)

        return comment;
    }

    async updateComment(dto: UpdateCommentDto, id: number, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const comment = await this.commentRepository.findByPk(id);
        if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        const updateComment = await this.commentRepository.update(
            {...dto},
            {where: {id}}
        );
        const updatedComment = await this.commentRepository.findByPk(id);
        return updatedComment;
    }

    async removeCommentHard(id: number, request: Request) {
        const comment = await this.commentRepository.findByPk(id);
        if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, comment.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const response = { commentId: comment.id, message: "Remove success."}
        const removedComment = await this.commentRepository.destroy({where: {id}})
        if (!removedComment) return {...response, message: "Remove error"};
        return response;
    }
}
