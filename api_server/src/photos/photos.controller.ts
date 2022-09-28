import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from './dto/create_photo.dto';
import { PhotosService } from './photos.service';

@Controller('/api/photos')
export class PhotosController {

    constructor(private photoService: PhotosService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPhoto(@Body() dto: CreatePhotoDto, @UploadedFile() image) {
        return this.photoService.createPhoto(dto, image);
    }

    @Get()
    getAllPhotos() {
        return this.photoService.getAllPhotos();
    }

    @Get('/:id')
    getPhoto(@Param('id') id: number) {
        return this.photoService.getPhotoById(id);
    }

    @Put('/:id')
    setAvatarPhoto(@Param('id') id: number) {
        return this.photoService.setAvatarState(id);
    }

    @Delete('/:id')
    deletePhoto(@Param('id') id: number) {
        return this.photoService.removePhotoHard(id);
    }
}
