import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { PhotosController } from './photos.controller';
import { Photo } from './photos.model';
import { PhotosService } from './photos.service';

@Module({
    controllers: [PhotosController],
    providers: [PhotosService],
    imports: [
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([
            User,
            Photo
        ]),
        FilesModule
    ]
})
export class PhotosModule {}
