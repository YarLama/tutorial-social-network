import { RolesService } from 'src/roles/roles.service';
import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
export declare class UsersService {
    private userRepository;
    private roleService;
    constructor(userRepository: typeof User, roleService: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    addUserRole(dto: AddUserRoleDto): Promise<AddUserRoleDto>;
    getUserByEmail(email: string): Promise<User>;
}
