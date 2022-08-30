import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { IToken } from '../types/universal_const'
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create_user.dto';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
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
