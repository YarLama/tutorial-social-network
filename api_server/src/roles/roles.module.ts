import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UserRoles } from 'src/users/user_role.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      Role,
      User,
      UserRoles
    ])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
