import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.model';
import { PhotosService } from './photos.service';

@Module({
    controllers: [PhotosController],
    providers: [PhotosService],
    imports: [
        SequelizeModule.forFeature([
            User,
            Photo
        ]),
        FilesModule
    ]
})
export class PhotosModule {}
