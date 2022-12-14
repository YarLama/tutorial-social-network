import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { FilesService } from 'src/files/files.service';
import { removeLocalImage } from 'src/utils/fs_functions';
import { CreatePhotoDto } from './dto/create_photo.dto';
import { Photo } from './photos.model';

@Injectable()
export class PhotosService {

    constructor(
        @InjectModel(Photo) private photoRepository: typeof Photo,
        private fileService: FilesService,
        private authService: AuthService
    ) {}

    async createPhoto(dto: CreatePhotoDto, image: any, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        if (!image) throw new HttpException('Image not attached', HttpStatus.BAD_REQUEST)
        const fileName = await this.fileService.createFileImage(image);
        const photo = await this.photoRepository.create({...dto, image: fileName});
        return photo;

    }

    async getAllPhotos() {
        const photos = await this.photoRepository.findAll({include: {all: true}});
        return photos;
    }

    async getPhotoById(id: number) {
        const photo = await this.photoRepository.findByPk(id);
        if (photo) return photo;
        throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }

    async removePhotoHard(photoId: number, request: Request) {
        const photo = await this.photoRepository.findByPk(photoId);
        if (!photo) throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, photo.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const response = { photoId: photo.id, message: "Remove success."};
        const removedPhoto = await this.photoRepository.destroy({where: {id: photoId}});
        const removeFromDist = await removeLocalImage(photo.image)
        if (!removedPhoto) return {...response, message: "Remove error"};
        return response;
    }

    private async removeAvatarState(userId: number): Promise<boolean> {
        const avatarUser = await this.photoRepository.findAll({
            where: {
                userId: userId,
                is_avatar: true
            }
        })
        if (!avatarUser.length) return false;

        const removeAvatarState = await this.photoRepository.update(
            {is_avatar: false},
            {where: {id : avatarUser[0].id}}
        )
        return true;
    }

    async setAvatarState(photoId: number, request: Request): Promise<Photo> {
        const photo = await this.photoRepository.findByPk(photoId);
        if (!photo) throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, photo.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const removeAvatarState = await this.removeAvatarState(photo.userId);
        const setAvatarState = await this.photoRepository.update(
            {is_avatar: true},
            {where: {id: photoId}}
        )
        const updatedPhoto = await this.photoRepository.findByPk(photoId);

        return updatedPhoto;
    }
}
