import { IsNumber } from "class-validator";

export class CreateContactDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly targetUserId: number;
}