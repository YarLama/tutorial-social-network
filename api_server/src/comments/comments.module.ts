import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/posts.model';
import { PostsModule } from 'src/posts/posts.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([
            User,
            Post,
            Comment
        ]),
        UsersModule,
        PostsModule
    ]
})
export class CommentsModule {}
