import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString({message: "Could be string parameter"})
    readonly content: string;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly postId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;
}