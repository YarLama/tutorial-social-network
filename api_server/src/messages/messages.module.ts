import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Message
    ]),
    FilesModule
  ]
})
export class MessagesModule {}
