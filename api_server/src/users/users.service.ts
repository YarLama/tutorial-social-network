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
import { Photo } from 'src/photos/photos.model';
import { IUserEntity } from './users.entity';
import { Op } from 'sequelize';
import { ContactWithUser } from 'src/types/universal_const';

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

    async getAllUsers(): Promise<IUserEntity[]> {
        const users = await this.userRepository.findAll({include: {all: true}});
        const responce = [];
        users.forEach(user => responce.push({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            description: user.description,
            phone: user.phone,
            email: user.email
        }))
        return responce;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUserById(id: number): Promise<IUserEntity> {
        const user = await this.userRepository.findOne({where: {id}});
        const responce = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name,
            description: user.description,
            phone: user.phone,
            email: user.email
        };
        return responce;
    }

    async getUsersByName(name: string, request: Request): Promise<User[]> {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const reqUser = await this.authService.getUserFromToken(request);
        const users = await this.userRepository.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            where: {
                [Op.or]: [ 
                    {
                        first_name: {
                            [Op.like]: `${name}%`
                        }
                    }, 
                    {
                        last_name: {
                            [Op.like]: `${name}%`
                        }
                    }
                ],
                [Op.not]: {id: reqUser.id}
            },
            include: {
                model: Photo,
                where: {
                    is_avatar: true
                },
                required: false
            }
        });
        if (users.length === 0) throw new HttpException('Users not found', HttpStatus.NOT_FOUND);

        return users;
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

    async getUserPhotos(id: number): Promise<Photo[]> {
        const user = await this.userRepository.findByPk(id, {
            include: [{
                model: Photo
            }]
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const photos = user.photos;
        if (!photos.length) throw new HttpException('Photos not found', HttpStatus.NOT_FOUND);
        return photos;
    }

    async getUserAvatar(id: number): Promise<Photo> {
        const photos = await this.getUserPhotos(id);
        const avatar = photos.filter(photo => photo.is_avatar == true)
        return avatar[0];
    }

    async getUserContacts(id: number, request: Request): Promise<ContactWithUser[]> {
        const isOwner = await this.authService.isEqualUserId(request, id);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const user = await this.userRepository.findByPk(id, {
            include: [{
                model: Contact
            }]
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const contacts = user.contacts;
        if (!!contacts.length) {
            const responce = await Promise.all(contacts.map(async (contact): Promise<ContactWithUser> => {
                const contactUser = await this.userRepository.findOne({
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    },
                    where: {
                        id: contact.targetUserId
                    },
                    include: {
                        model: Photo,
                        where: {
                            is_avatar: true
                        },
                        required: false
                    }
                });
                if (!contactUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                
                const contactWithUserInfo = {
                    id: contact.id,
                    description: contact.description,
                    user: contactUser
                }
                return contactWithUserInfo;
            }))

            return responce;
        }
        return [];
    }

    async updateUser(dto: CreateUserDto, id: number, request: Request): Promise<User> {
        const user = await this.userRepository.findByPk(id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const isOwner = await this.authService.isEqualUserId(request, user.id);
        if (!isOwner) throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
        const updateUser = await this.userRepository.update(
            {...dto},
            {where: {id}} 
        );
        const updatedUser = await this.userRepository.findByPk(id);
        return updatedUser;
    }

}
