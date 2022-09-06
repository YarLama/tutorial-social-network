import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { AuthService } from './auth.service';
import { IToken } from '../types/universal_const'
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';

@Controller('/api/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto): Promise<IToken> {
        return this.authService.login(dto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() dto: CreateUserDto): Promise<IToken> {
        return this.authService.registration(dto);
    }
}
