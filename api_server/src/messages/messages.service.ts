import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateMessageDto } from './dto/create_message.dto';
import { Message } from './messages.model';

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
        let fileName = message.image;
        const imageCondition = (image !== null && image !== undefined);
        fileName = imageCondition ? await this.fileService.createFileImage(image) : null;

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
            return response;
        }
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    }
}
