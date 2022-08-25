import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getAllRoles(): Promise<Role[]> {
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }
}
