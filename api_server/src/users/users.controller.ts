import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {

    constructor(
       private userService: UsersService,
    ) {}

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

    @Get('/:email')
    getUserbyEmail(@Param('email') email: string): Promise<User> {
        return this.userService.getUserByEmail(email);
    }

    

}
