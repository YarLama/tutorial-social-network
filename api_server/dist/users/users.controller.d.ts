import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(dto: CreateUserDto): Promise<User>;
    addUserRole(dto: AddUserRoleDto): Promise<AddUserRoleDto>;
    getAllUsers(): Promise<User[]>;
    getUserbyEmail(email: string): Promise<User>;
}
