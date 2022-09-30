import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/create_message.dto';
import { MessagesService } from './messages.service';

@Controller('/api/messages')
export class MessagesController {

    constructor(private messageService: MessagesService) {

    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createMessage(@Body() dto: CreateMessageDto, @UploadedFile() image) {
        return this.messageService.createMessage(dto, image);
    }

    @Get()
    getAllMessages() {
        return this.messageService.getAllMessages();
    }

    @Get('/:id')
    getMessage(@Param('id') id: number) {
        return this.messageService.getMessageById(id);
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateMessage(@Body() dto: CreateMessageDto, @Param('id') id: number, @UploadedFile() image){
        return this.messageService.updateMessage(dto, id, image);
    }

    @Delete('/:id')
    deleteMessage(@Param('id') id: number) {
        return this.messageService.removeMessageHard(id);
    }
}
