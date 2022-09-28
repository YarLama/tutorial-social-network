import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/comments/comments.model';
import { Photo } from 'src/photos/photos.model';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UserRoles } from './user_role.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Post,
      Comment,
      Photo
    ]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
