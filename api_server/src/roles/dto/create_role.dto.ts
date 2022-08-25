import { IsString, Length } from "class-validator";

export class CreateRoleDto {

    @IsString({message: 'Could be string parameter'})
    @Length(4, 32, {message: 'Roles value length could be 4-16 symbols'})
    readonly value: string;

    @IsString({message: 'Could be string parameter'})
    readonly description: string;
}