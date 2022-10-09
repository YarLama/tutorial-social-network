import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { ContactsController } from './contacts.controller';
import { Contact } from './contacts.model';
import { ContactsService } from './contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Contact
    ]),
    UsersModule,
    forwardRef(() => AuthModule),
  ]
})
export class ContactsModule {}
