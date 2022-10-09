import { IsNumber } from "class-validator";

export class CreateLikesCommentDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly commentId: number;
}