import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Contact } from './contacts.model';
import { CreateContactDto } from './dto/create_contact.dto';
import { UpdateContactDto } from './dto/update_contact.dto';

@Injectable()
export class ContactsService {

    constructor(
        @InjectModel(Contact) private contactRepository: typeof Contact,
        private authService: AuthService,
        private userService: UsersService
    ) {}

    async createContact(dto: CreateContactDto, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user1 = await this.userService.getUserById(dto.userId)
        const user2 = await this.userService.getUserById(dto.targetUserId);
        const arleadyExistedContact = await this.contactRepository.findAll({where: {
            userId: user1.id,
            targetUserId: user2.id
        }});
        if (arleadyExistedContact.length) throw new HttpException('Contact arleady exist', HttpStatus.FORBIDDEN)
        if (user1.id === user2.id) throw new HttpException('You cant add yourself to contacts', HttpStatus.FORBIDDEN)
        if (!user1 || !user2) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const contact = await this.contactRepository.create({...dto});
        return contact;
    }

    async getContactById(id: number, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, id);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const contact = await this.contactRepository.findByPk(id);
        if (contact) return contact;
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }

    async getAllContacts() {
        const contacts = await this.contactRepository.findAll({include: {all: true}});
        return contacts;
    }

    async updateContact(dto: UpdateContactDto, id: number, request: Request) {
        const isOwner = await this.authService.isEqualUserId(request, dto.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const contact = await this.contactRepository.findByPk(id);
        if (!contact) throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        const updateContact = await this.contactRepository.update({...dto}, {where: {id}})
        const updatedContact = await this.contactRepository.findByPk(id);
        return updatedContact;
    }

    async removeContactHard(id: number, request: Request) {
        const contact = await this.contactRepository.findByPk(id);
        if (!contact) throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, contact.userId);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const response = { contactId: contact.id, message: "Remove success."}
        const removedContact = await this.contactRepository.destroy({where: {id}});
        if (!removedContact) return {...response, message: "Remove error"};
        return response;

    }
}
