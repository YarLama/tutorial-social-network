import { HttpException, HttpStatus } from "@nestjs/common";


export class ValidationException extends HttpException {
    messages;

    constructor(responce: string | Record<string, any>) {
        super(responce, HttpStatus.BAD_REQUEST);
        this.messages = responce;
    }
}