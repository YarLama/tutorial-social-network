import { IsNumber } from "class-validator";

export class CreateLikesPostDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly postId: number;
}