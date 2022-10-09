import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RolesForAccess } from 'src/auth/decorators/roles-auth.decorator';
import { RolesAccessGuard } from 'src/auth/guards/roles-access.guard';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { RoleNames } from 'src/utils/constants';
import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Controller('/api/roles')
export class RolesController {

    constructor(
        private roleService: RolesService,
    ) {}
    
    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(dto)
    }

    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @Get()
    getAllUsers(): Promise<Role[]> {
        return this.roleService.getAllRoles();
    }

    @RolesForAccess(RoleNames.ADMIN)
    @UseGuards(RolesAccessGuard)
    @Get(':/value')
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.roleService.getRoleByValue(value);
    }
}
