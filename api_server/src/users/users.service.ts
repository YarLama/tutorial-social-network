import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { RoleNames } from 'src/utils/constants';
import { AddUserRoleDto } from './dto/add_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.model';
import { Comment } from 'src/comments/comments.model'
import { Contact } from 'src/contacts/contacts.model';
import { AuthService } from 'src/auth/auth.service';
import { Post } from 'src/posts/posts.model';

@Injectable()
export class UsersService {
    userService: any;

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
        private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {

        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue(RoleNames.USER);
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async addUserRole(dto: AddUserRoleDto): Promise<AddUserRoleDto> {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if(role && user) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {email},
            include: {all: true}
        });
        
        return user;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {id},
            include: {all: true}
        });

        return user;
    }

    async getUserComments(id: number): Promise<Comment[]> {
        const user = await this.userRepository.findByPk(id, {
            include: [{
                model: Comment
            }]
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const comments = user.comments;
        if (!comments.length) throw new HttpException('Comments not found', HttpStatus.NOT_FOUND);
        return comments;
    }

    async getUserPosts(id: number): Promise<Post[]> {
        const user = await this.userRepository.findByPk(id, {
            include: [{
                model: Post
            }]
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const posts = user.posts;
        if (!posts.length) throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
        return posts;
    }

    async getUserContacts(id: number, request: Request): Promise<Contact[]> {
        const isOwner = await this.authService.isEqualUserId(request, id);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user = await this.userRepository.findByPk(id, {
            include: [{
                model: Contact
            }]
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const contacts = user.contacts;
        if (!contacts.length) throw new HttpException('Contacts not found', HttpStatus.NOT_FOUND);
        return contacts;
    }

}
