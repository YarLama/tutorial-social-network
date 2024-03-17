export type ContactCreateRequest = {
    userId: number;
    targetUserId: number;
}

export type ContactCreateRequestErrors = {
    userId?: number;
    targetUserId?: number;
}

export type ContactUpdateRequest = {
    id: number,
    userId: number;
    description: string | null;
}

export type ContactUpdateRequestErrors = {
    userId?: number;
    description?: string | null;
}

export type ContactDeleteRequest = {
    id: number;
}