import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { RoleNames } from 'src/utils/constants';
import { CreateMessageDto } from './dto/create_message.dto';
import { MessagesService } from './messages.service';

@Controller('/api/messages')
export class MessagesController {

    constructor(private messageService: MessagesService) {

    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createMessage(@Body() dto: CreateMessageDto, @UploadedFile() image) {
        return this.messageService.createMessage(dto, image);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllMessages() {
        return this.messageService.getAllMessages();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getMessage(@Param('id') id: number) {
        return this.messageService.getMessageById(id);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateMessage(@Body() dto: CreateMessageDto, @Param('id') id: number, @UploadedFile() image){
        return this.messageService.updateMessage(dto, id, image);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deleteMessage(@Param('id') id: number) {
        return this.messageService.removeMessageHard(id);
    }
}
