import { IsBoolean } from "class-validator";

export class UpdatePhotoDto {

    @IsBoolean({message: "Could be boolean parameter"})
    readonly isAvatar: boolean;
}