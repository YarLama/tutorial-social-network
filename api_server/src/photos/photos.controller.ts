import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { RoleNames } from 'src/utils/constants';
import { CreatePhotoDto } from './dto/create_photo.dto';
import { PhotosService } from './photos.service';

@Controller('/api/photos')
export class PhotosController {

    constructor(private photoService: PhotosService) {}

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPhoto(@Body() dto: CreatePhotoDto, @UploadedFile() image, @Req() request: Request) {
        return this.photoService.createPhoto(dto, image, request);
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
    setAvatarPhoto(@Param('id') id: number, @Req() request: Request) {
        return this.photoService.setAvatarState(id, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deletePhoto(@Param('id') id: number, @Req() request: Request) {
        return this.photoService.removePhotoHard(id, request);
    }
}
