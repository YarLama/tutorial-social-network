import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { IToken } from '../types/universal_const'
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create_user.dto';


@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(dto: CreateUserDto): Promise<IToken> {
        const user = await this.validateUser(dto);
        return this.generateToken(user)
    }

    async registration(dto: CreateUserDto): Promise<IToken> {
        const isUserExist = await this.userService.getUserByEmail(dto.email);
        if (isUserExist) throw new HttpException('User arleady exist', HttpStatus.BAD_REQUEST);
        
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({...dto, password: hashPassword});

        return this.generateToken(user);
    }

    async getUserFromToken(request: Request): Promise<User> {
        const token = request.headers['authorization'].split(' ')[1];
        const user = this.jwtService.verify(token);
        return user;
    }

    async isEqualUserId(request: Request, userId: number): Promise<boolean> {
        const user = await this.getUserFromToken(request);
        return Number(user.id) === Number(userId);
    }

    async isAdminAccessible(request: Request): Promise<boolean> {
        const user = await this.getUserFromToken(request);
        return user.roles.some((role: { value: string; }) => role.value === "ADMIN");
    }

    async isCertainUser(request: Request, id: number[]): Promise<Boolean> {
        
        const user = await this.getUserFromToken(request);
        return id.includes(Number(user.id));
    }

    private async generateToken(user: User): Promise<IToken> {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles
        }

        return { token: this.jwtService.sign(payload) }
    }

    private async validateUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEqual = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEqual) return user;
        throw new UnauthorizedException('Uncorrect email or password');
    }
}
