import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { AuthService } from './auth.service';
import { IToken } from '../types/universal_const'

@Controller('/api/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto): Promise<IToken> {
        return this.authService.login(dto)
    }

    @Post('/registration')
    registration(@Body() dto: CreateUserDto): Promise<IToken> {
        return this.authService.registration(dto);
    }
}
