import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
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
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createMessage(@Body() dto: CreateMessageDto, @UploadedFile() image, @Req() request: Request) {
        return this.messageService.createMessage(dto, image, request);
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
    getMessage(@Param('id') id: number, @Req() request: Request) {
        return this.messageService.getMessageById(id, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateMessage(@Body() dto: CreateMessageDto, @Param('id') id: number, @UploadedFile() image, @Req() request: Request){
        return this.messageService.updateMessage(dto, id, image, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deleteMessage(@Param('id') id: number, @Req() request: Request) {
        return this.messageService.removeMessageHard(id, request);
    }
}
