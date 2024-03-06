export type CreateContactRequest = {
    userId: number;
    targetUserId: number;
}

export type UpdateContactRequest = {
    targetUserId: number;
    userId: number;
    description: string | null;
}

export type DeleteContactRequest = {
    targetUserId: number;
}