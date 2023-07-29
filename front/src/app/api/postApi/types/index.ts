export type PostCreateRequest = {
    title: string;
    content?: string;
    userId: number;
    image?: File;
}
export type PostCreateRequestErrors = {
    title?: string;
    content?: string;
    userId?: number;
    image?: File;
} 

export type PostUpdateRequest = {
    title: string;
    content?: string;
    isCommentable: boolean;
    updatedImage?: File | string;
}

export type PostUpdateRequestErrors = {
    title?: string;
    content?: string;
    isCommentable?: boolean;
    image?: File | string;
}