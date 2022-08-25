import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(dto: CreateRoleDto): Promise<Role>;
    getAllUsers(): Promise<Role[]>;
    getRoleByValue(value: string): Promise<Role>;
}
