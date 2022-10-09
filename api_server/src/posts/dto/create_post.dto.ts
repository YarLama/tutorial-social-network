import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {

    @IsString({message: 'Could be string parameter'})
    readonly title: string;

    @IsString({message: 'Could be string parameter'})
    readonly content: string;

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;
}