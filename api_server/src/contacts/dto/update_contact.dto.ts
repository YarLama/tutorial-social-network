export class UpdateContactDto {
    readonly userId: number;
    readonly targetUserId: number;
    readonly description: string;
}