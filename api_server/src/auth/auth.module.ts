import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from 'src/comments/comments.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { LikesModule } from 'src/likes/likes.module';
import { MessagesModule } from 'src/messages/messages.module';
import { PhotosModule } from 'src/photos/photos.module';
import { PostsModule } from 'src/posts/posts.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET_1234',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
