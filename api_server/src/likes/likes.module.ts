import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/comments/comments.model';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesComment } from './likes_comments.model';
import { LikesPost } from './likes_posts.model';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    SequelizeModule.forFeature([
      User,
      LikesComment,
      LikesPost,
      Post,
      Comment
    ])
  ]
})
export class LikesModule {}
