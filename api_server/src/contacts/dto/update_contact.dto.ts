import { IsNumber, IsString } from "class-validator";

export class UpdateContactDto {

    @IsNumber({}, {message: "Could be integer parameter"})
    readonly userId: number;

}