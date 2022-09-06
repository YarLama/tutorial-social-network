import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Controller('/api/roles')
export class RolesController {

    constructor(
        private roleService: RolesService,
    ) {}
    
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(dto)
    }

    @Get()
    getAllUsers(): Promise<Role[]> {
        return this.roleService.getAllRoles();
    }

    @Get(':/value')
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.roleService.getRoleByValue(value);
    }
}
