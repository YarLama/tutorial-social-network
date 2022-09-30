export class CreateMessageDto {
    readonly fromUserId: number;
    readonly toUserId: number;
    readonly content: string;
    readonly isVisible: boolean;
}