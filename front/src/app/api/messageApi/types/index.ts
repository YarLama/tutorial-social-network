export type MessageCreateRequest = {
    from_userId: number;
    to_userId: number;
    content: string;
    image?: File;
}

export type MessageCreateRequestErrors = {
    from_userId?: number;
    to_userId?: number;
    content?: string;
    image?: File;
}

export type MessageUpdateRequest = {
    from_userId: number;
    to_userId: number;
    content: string;
    image?: File | string;
}

export type MessageUpdateRequestErrors = {
    from_userId?: number;
    to_userId?: number;
    content?: string;
    image?: File | string;
}