import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { RoleNames } from "src/utils/constants";
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { IUserEntity } from './users.entity';

@Controller('/api/users')
export class UsersController {

    constructor(
       private userService: UsersService,
    ) {}

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.createUser(dto);
    }

    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addUserRole(@Body() dto: AddUserRoleDto) {
        return this.userService.addUserRole(dto);
    }

    @RolesForAccess(RoleNames.ADMIN, RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Put('/:id')
    updateUser(@Body() dto: CreateUserDto, @Param('id') id: number, @Req() request: Request): Promise<IUserEntity> {
        return this.userService.updateUser(dto, id, request);
    }

    @RolesForAccess(RoleNames.ADMIN, RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllUsers(): Promise<IUserEntity[]> {
        return this.userService.getAllUsers();
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id/comments/')
    getUserComments(@Param('id') id: number) {
        return this.userService.getUserComments(Number(id));
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id/contacts/')
    getUserContacts(@Param('id') id: number, @Req() request: Request) {
        return this.userService.getUserContacts(Number(id), request);
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id/posts/')
    getUserPosts(@Param('id') id: number) {
        return this.userService.getUserPosts(Number(id));
    }

    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id/photos/')
    getUserPhotos(@Param('id') id: number) {
        return this.userService.getUserPhotos(Number(id));
    }
    
    @RolesForAccess(RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id/avatar/')
    getUserAvatar(@Param('id') id: number) {
        return this.userService.getUserAvatar(Number(id));
    }

    @RolesForAccess(RoleNames.ADMIN, RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:id')
    getUser(@Param('id') id: number): Promise<IUserEntity> {
        return this.userService.getUserById(id);
    }

}
