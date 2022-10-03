import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateMessageDto } from './dto/create_message.dto';
import { Message } from './messages.model';
import { getImageBuffer, isImageExist, removeLocalImage } from 'src/utils/fs_functions';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(Message) private messageRepository: typeof Message,
        private fileService: FilesService
    ) {}

    async createMessage(dto: CreateMessageDto, image: any) {
        if (!dto.content && !image) throw new HttpException('Message content and image attach are ampty', HttpStatus.BAD_REQUEST); 
        if (image) {
            const fileName = await this.fileService.createFileImage(image);
            const message = await this.messageRepository.create({...dto, image: fileName});
            return message;
        }
        const message = await this.messageRepository.create(dto);
        return message;
    }

    async getMessageById(id: number): Promise<Message> {
        const message = await this.messageRepository.findByPk(id);
        if (message) return message;
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    async getAllMessages(): Promise<Message[]> {
        const messages = await this.messageRepository.findAll();
        return messages;
    }

    async updateMessage(dto: CreateMessageDto, id: number, image: any) {
        const message = await this.messageRepository.findByPk(id);
        if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        const image_exist = await isImageExist(message.image);
        let fileName: string | null;
        
        if (image_exist && image) {
            const image_exist_buffer = await getImageBuffer(message.image);
            const buffer_compare_result = Buffer.compare(image.buffer, image_exist_buffer);
            if (buffer_compare_result === 0) {
                const updateMessageWithoutImage = await this.messageRepository.update(
                    {...dto},
                    {where: {id}}
                );
            } else {
                fileName = await this.fileService.createFileImage(image);
                const updateMessage = await this.messageRepository.update(
                    {...dto, image: fileName},
                    {where: {id}}
                );
                const removeFromDist = await removeLocalImage(message.image)
            }
        } else if (image_exist && image == null) {
            fileName = null;
            const updateMessage = await this.messageRepository.update(
                {...dto, image: fileName},
                {where: {id}}
            );
            const removeFromDist = await removeLocalImage(message.image)
        } else if (!image_exist && image == null) {
            const updateMessageWithoutImage = await this.messageRepository.update(
                {...dto},
                {where: {id}}
            );
        } else if (!image_exist && image) {
            fileName = await this.fileService.createFileImage(image);
            const updateMessage = await this.messageRepository.update(
                {...dto, image: fileName},
                {where: {id}}
            );
        }
        
        const updateMessage = await this.messageRepository.update(
            {...dto, image: fileName},
            {where: {id}}
        );
        const updatedMessage = await this.messageRepository.findByPk(id);
        return updatedMessage;
    }

    async removeMessageHard(id: number) {
        const message = await this.messageRepository.findByPk(id);
        const response = { messageId: message.id, message: "Remove success."}
        if (message) {
            const removedMessage = await this.messageRepository.destroy({where: {id}});
            if (message.image) {
                const removeFromDist = await removeLocalImage(message.image)
            }
            return response;
        }
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    }
}
