import { IsBoolean, IsString } from "class-validator";

export class CreatePhotoDto {

    @IsString({message: "Could be string parameter"})
    readonly userId: number;

    @IsBoolean({message: "Could be boolean parameter"})
    readonly isAvatar: boolean;
}