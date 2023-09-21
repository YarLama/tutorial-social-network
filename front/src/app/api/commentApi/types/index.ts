export type CreateCommentRequest = {
    userId: number,
    postId: number,
    content: string
}

export type UpdateCommentRequest = {
    content: string;
}