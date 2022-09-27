import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Contact } from './contacts.model';
import { CreateContactDto } from './dto/create_contact.dto';
import { UpdateContactDto } from './dto/update_contact.dto';

@Injectable()
export class ContactsService {

    constructor(
        @InjectModel(Contact) private contactRepository: typeof Contact,
        private userService: UsersService
    ) {}

    async createContact(dto: CreateContactDto) {
        const user1 = await this.userService.getUserById(dto.userId)
        const user2 = await this.userService.getUserById(dto.targetUserId);
        if (!user1 || !user2) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        const contact = await this.contactRepository.create({...dto});
        return contact;
    }

    async getContactById(id: number) {
        const contact = await this.contactRepository.findByPk(id);
        if (contact) return contact;
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }

    async getAllContacts() {
        const contacts = await this.contactRepository.findAll({include: {all: true}});
        return contacts;
    }

    async updateContact(dto: UpdateContactDto, id: number) {
        const contact = await this.contactRepository.findByPk(id);
        if (!contact) throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        const updateContact = await this.contactRepository.update(
            {...dto},
            {where: {id}}
        )
        const updatedContact = await this.contactRepository.findByPk(id);
        return updatedContact;
    }

    async removeContactHard(id: number) {
        const contact = await this.contactRepository.findByPk(id);
        const response = { contactId: contact.id, message: "Remove success."}
        if (contact) {
            const removedContact = this.contactRepository.destroy({where: {id}});
            if (!removedContact) return {...response, message: "Remove error"};
            return response;
        }
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
}
