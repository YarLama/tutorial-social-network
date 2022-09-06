import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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

    @Post('/role')
    addUserRole(@Body() dto: AddUserRoleDto) {
        return this.userService.addUserRole(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:person')
    getUser(@Param('person') person: string): Promise<User> {
        const isNumber: boolean = Number(person) ? true : false;
        return isNumber ? 
            this.userService.getUserById(Number(person)) : 
            this.userService.getUserByEmail(person);
    }

}
