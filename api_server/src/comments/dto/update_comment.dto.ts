import { IsString } from "class-validator";

export class UpdateCommentDto {

    @IsString({message: "Could be string parameter"})
    readonly content: string;
}