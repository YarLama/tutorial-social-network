import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create_contact.dto';
import { UpdateContactDto } from './dto/update_contact.dto';

@Controller('/api/contacts')
export class ContactsController {

    constructor(private contactService: ContactsService) {

    }

    @Post()
    createContact(@Body() dto: CreateContactDto) {
        return this.contactService.createContact(dto);
    }

    @Get()
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @Get('/:id')
    getContact(@Param('id') id: number) {
        return this.contactService.getContactById(id);
    }

    @Put('/:id')
    updateContact(@Body() dto: UpdateContactDto, @Param('id') id: number) {
        return this.contactService.updateContact(dto, id)
    }

    @Delete('/:id')
    deleteContact(@Param('id') id: number) {
        return this.contactService.removeContactHard(id);
    }

}
