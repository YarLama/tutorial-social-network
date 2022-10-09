import { IsBoolean, IsString } from "class-validator";

export class UpdatePostDto {

    @IsString({message: "Could be string parameter"})
    readonly title: string;

    @IsString({message: "Could be string parameter"})
    readonly content: string;

    @IsBoolean({message: "Could be boolean parameter"})
    readonly is_commentable: boolean;
}