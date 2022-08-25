import { IsNumber, IsString } from "class-validator";

export class AddUserRoleDto {
    @IsString({message: "Could be string parameter"})
    readonly value: string;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;
}