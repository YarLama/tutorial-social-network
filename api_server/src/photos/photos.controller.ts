import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { RoleNames } from 'src/utils/constants';
import { CreatePhotoDto } from './dto/create_photo.dto';
import { PhotosService } from './photos.service';

@Controller('/api/photos')
export class PhotosController {

    constructor(private photoService: PhotosService) {}

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPhoto(@Body() dto: CreatePhotoDto, @UploadedFile() image) {
        return this.photoService.createPhoto(dto, image);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllPhotos() {
        return this.photoService.getAllPhotos();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getPhoto(@Param('id') id: number) {
        return this.photoService.getPhotoById(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Put('/:id')
    setAvatarPhoto(@Param('id') id: number) {
        return this.photoService.setAvatarState(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deletePhoto(@Param('id') id: number) {
        return this.photoService.removePhotoHard(id);
    }
}
