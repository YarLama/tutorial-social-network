import { IsNumber, IsString } from "class-validator";

export class UpdateContactDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly targetUserId: number;

    @IsString({message: "Could be string parameter"})
    readonly description: string;
}