export class CreateCommentDto {
    readonly content: string;
    readonly postId: number;
    readonly userId: number;
}