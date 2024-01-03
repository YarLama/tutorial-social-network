import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateMessageDto } from './dto/create_message.dto';
import { Message } from './messages.model';
import { getImageBuffer, isImageExist, removeLocalImage } from 'src/utils/fs_functions';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(Message) private messageRepository: typeof Message,
        private fileService: FilesService,
        private authService: AuthService
    ) {}

    async createMessage(dto: CreateMessageDto, image: any, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.from_userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        if (!dto.content && !image) throw new HttpException('Message content and image attach are ampty', HttpStatus.BAD_REQUEST); 
        if (image) {
            const fileName = await this.fileService.createFileImage(image);
            const message = await this.messageRepository.create({...dto, image: fileName});
            return message;
        }
        const message = await this.messageRepository.create(dto);
        return message;
    }

    async getMessageById(id: number, request: Request): Promise<Message> {
        const message = await this.messageRepository.findByPk(id);
        if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        const isOwner =  await this.authService.isCertainUser(request, [message.to_userId, message.from_userId]);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        return message;
    }

    async getAllMessages(): Promise<Message[]> {
        const messages = await this.messageRepository.findAll();
        return messages;
    }

    async getUserMessages(request: Request): Promise<Message[]> {
        const user = await this.authService.getUserFromToken(request);
        const userId = Number(user.id)
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const messages = await this.messageRepository.findAll({
            where: {
                [Op.or]: [
                    {from_userId: userId},
                    {to_userId: userId}
                ]
            }
        })
        if (!messages.length) throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
        const acceptedMessages = messages.filter(async m => {
            const isCertainUser = await this.authService.isCertainUser(request, [m.from_userId, m.to_userId]);
            const condition = (m.from_userId === userId || m.to_userId === userId) && isCertainUser
            return condition
        });
        if (!acceptedMessages.length) throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
        return acceptedMessages
    }

    async updateMessage(dto: CreateMessageDto, id: number, image: any, request: Request) {
        const message = await this.messageRepository.findByPk(id);
        if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, message.from_userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
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

    async removeMessageHard(id: number, request: Request) {
        const message = await this.messageRepository.findByPk(id);
        if (!message) throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, message.from_userId);
        const isPenpal = await this.authService.isEqualUserId(request, message.to_userId);
        if (!isOwner && !isPenpal) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const response = { messageId: message.id, message: "Remove success."};
        const removedMessage = await this.messageRepository.destroy({where: {id}});
        if (message.image) {
            const removeFromDist = await removeLocalImage(message.image)
        }
        return response;
    }
}
