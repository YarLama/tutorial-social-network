import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly from_userId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly to_userId: number;

    @IsString({message: "Could be string parameter"})
    readonly content: string;

    @IsBoolean({message: "Could be boolean parameter"})
    readonly is_visible: boolean;
}