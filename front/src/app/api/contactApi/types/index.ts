export type ContactCreateRequest = {
    userId: number;
    targetUserId: number;
}

export type ContactCreateRequestErrors = {
    userId?: number;
    targetUserId?: number;
}

export type ContactUpdateRequest = {
    userId: number;
    description: string;
}

export type ContactUpdateRequestErrors = {
    userId?: number;
    description?: string;
}