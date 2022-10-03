export class CreateMessageDto {
    readonly from_userId: number;
    readonly to_userId: number;
    readonly content: string;
    readonly is_visible: boolean;
}