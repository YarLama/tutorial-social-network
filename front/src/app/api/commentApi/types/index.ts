export type CommentCreateRequest = {
    userId: number,
    postId: number,
    content: string
}

export type CommentCreateRequestErrors = {
    content?: string | null;
}

export type CommentUpdateRequest = {
    content: string;
}