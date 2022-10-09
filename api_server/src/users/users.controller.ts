import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RoleNames } from "src/utils/constants";
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

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
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @RolesForAccess(RoleNames.ADMIN, RoleNames.USER)
    @UseGuards(RolesAccessGuard)
    @Get('/:person')
    getUser(@Param('person') person: string): Promise<User> {
        const isNumber: boolean = Number(person) ? true : false;
        return isNumber ? 
            this.userService.getUserById(Number(person)) : 
            this.userService.getUserByEmail(person);
    }

}
