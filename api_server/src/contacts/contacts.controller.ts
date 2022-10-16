import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { IToken } from 'src/types/universal_const';
import { RoleNames } from 'src/utils/constants';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create_contact.dto';
import { UpdateContactDto } from './dto/update_contact.dto';

@Controller('/api/contacts')
export class ContactsController {

    constructor(private contactService: ContactsService) {

    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post()
    createContact(@Body() dto: CreateContactDto, @Req() request: Request) {
        return this.contactService.createContact(dto, request);
    }

    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getContact(@Param('id') id: number, @Req() request: Request) {
        return this.contactService.getContactById(id, request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/user/:id')
    getUserContacts(@Param('id') id: number, @Req() request: Request) {
        return this.contactService.getUserContacts(Number(id), request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    updateContact(@Body() dto: UpdateContactDto, @Param('id') id: number, @Req() request: Request) {
        return this.contactService.updateContact(dto, id, request)
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Delete('/:id')
    deleteContact(@Param('id') id: number, @Req() request: Request) {
        return this.contactService.removeContactHard(id, request);
    }

}
