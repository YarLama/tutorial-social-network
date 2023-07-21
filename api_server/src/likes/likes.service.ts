import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { Comment } from 'src/comments/comments.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { CreateLikesCommentDto } from './dto/create_likes_comment.dto';
import { CreateLikesPostDto } from './dto/create_likes_post.dto';
import { LikesComment } from './likes_comments.model';
import { LikesPost } from './likes_posts.model';

@Injectable()
export class LikesService {

    constructor(
        @InjectModel(LikesComment) private likeCommentRepository: typeof LikesComment,
        @InjectModel(LikesPost) private likePostRepository: typeof LikesPost,
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Post) private postRepository: typeof Post,
        @InjectModel(Comment) private commentRepository: typeof Comment,
        private authService: AuthService
    ) {}

    async createLikePost(dto: CreateLikesPostDto, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user = await this.userRepository.findByPk(dto.userId);
        const post = await this.postRepository.findByPk(dto.postId);

        if (!user || !post) throw new HttpException('User or post not found', HttpStatus.BAD_REQUEST);

        const foundedLikePost = await this.likePostRepository.findAll({
            where: {
                userId: dto.userId, 
                postId: dto.postId
            }
        })

        if (foundedLikePost.length) throw new HttpException('Like arleady exist', HttpStatus.BAD_REQUEST);
        
        const like = await this.likePostRepository.create(dto);
        return like;
    }

    async createLikeComment(dto: CreateLikesCommentDto, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user = await this.userRepository.findByPk(dto.userId);
        const comment = await this.commentRepository.findByPk(dto.commentId);

        if (!user || !comment) throw new HttpException('User or comment not found', HttpStatus.BAD_REQUEST);

        const foundedLikeComment = await this.likeCommentRepository.findAll({
            where: {
                userId: dto.userId, 
                commentId: dto.commentId
            }
        })

        if (foundedLikeComment.length) throw new HttpException('Like arleady exist', HttpStatus.BAD_REQUEST);
        
        const like = await this.likeCommentRepository.create(dto);
        return like;
    }

    async getAllLikesComment() {
        return this.likeCommentRepository.findAll();
    }

    async getAllLikesPost() {
        return this.likePostRepository.findAll();
    }

    async getLikesByPostId(id: number): Promise<LikesPost[]> {
        const foundedLikes = await this.likePostRepository.findAll({
            where: { postId: id }
        }) 
        if (!foundedLikes) throw new HttpException('Likes not found', HttpStatus.BAD_REQUEST);

        return foundedLikes;
    }

    async getLikesByCommentId(id: number): Promise<LikesComment[]> {
        const foundedLikes = await this.likeCommentRepository.findAll({
            where: { commentId: id }
        }) 
        if (!foundedLikes) throw new HttpException('Likes not found', HttpStatus.BAD_REQUEST);

        return foundedLikes;
    }

    async getCommentLikesByUser(userId: number): Promise<LikesComment[]> {
        const foundedLikes = await this.likeCommentRepository.findAll({
            where: { userId }
        }) 
        if (!foundedLikes) throw new HttpException('Likes not found', HttpStatus.BAD_REQUEST);

        return foundedLikes;
    }

    async getPostLikesByUser(userId: number): Promise<LikesPost[]> {
        const foundedLikes = await this.likePostRepository.findAll({
            where: { userId }
        }) 
        if (!foundedLikes) throw new HttpException('Likes not found', HttpStatus.BAD_REQUEST);

        return foundedLikes;
    }

    async getPostLikesInfo(id: number, request: Request) {
        const post = await this.postRepository.findByPk(id);
        if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        const user = await this.authService.getUserFromToken(request);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const likes = await this.likePostRepository.findAll({where: {postId: post.id}})
        const like = await this.likePostRepository.findAll({where: {postId: post.id, userId: user.id}});
        const isOwner = !!like.length;
        const responce = {
            countLikes: likes.length,
            isUserLikeOwner: isOwner
        }; 
        return responce;
    }

    async getCommentLikesInfo(id: number, request: Request) {
        const comment = await this.commentRepository.findByPk(id);
        if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        const user = await this.authService.getUserFromToken(request);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const likes = await this.likeCommentRepository.findAll({where: {commentId: comment.id}})
        const like = await this.likeCommentRepository.findAll({where: {commentId: comment.id, userId: user.id}});
        const isOwner = !!like.length;
        const responce = {
            countLikes: likes.length,
            isUserLikeOwner: isOwner
        }; 
        return responce;
    }

    async removePostLikeHard(id: number, request: Request) {
        console.log(id)
        const post = await this.postRepository.findByPk(id);
        if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        const user = await this.authService.getUserFromToken(request);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const like = await this.likePostRepository.findAll({where: {postId: post.id, userId: user.id}});
        if (!like.length) throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
        console.log(!!like.length)
        const response = { like_id: like[0].id, message: "Remove success."}
        console.log('hui')
        const removedLike = await this.likePostRepository.destroy({where : {id: like[0].id}});
        if (!removedLike) return {...response, message: "Remove error"}
        return response;
    }

    async removeCommentLikeHard(id: number, request: Request) {
        const comment = await this.commentRepository.findByPk(id);
        if (!comment) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        const user = await this.authService.getUserFromToken(request);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const like = await this.likeCommentRepository.findAll({where: {commentId: comment.id, userId: user.id}});
        if (!like.length) throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
        const response = { like_id: like[0].id, message: "Remove success."}
        const removedLike = await this.likeCommentRepository.destroy({where : {id: like[0].id}});
        if (!removedLike) return {...response, message: "Remove error"}
        return response;
    }

}
