import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    
    @IsString({message: 'Could be string parameter'})
    @Length(4, 16, {message: 'First name length could be 4-16 symbols'})
    readonly first_name: string;

    @IsString({message: 'Could be string parameter'})
    @Length(4, 16, {message: 'Last name length could be 4-16 symbols'})
    readonly last_name: string;

    @IsString({message: 'Could be string parameter'})
    @Length(10, 10, {message: 'Phone number is must be 10 number length'})
    readonly phone: string;

    @IsString({message: 'Could be string parameter'})
    @IsEmail({} , {message: 'Uncorrect e-mail'})
    readonly email: string;

    @IsString({message: 'Could be string parameter'})
    @Length(4, 16, {message: 'Password length could be 4-16 symbols'})
    readonly password: string;

    readonly middle_name: string;

    readonly description: string;
}