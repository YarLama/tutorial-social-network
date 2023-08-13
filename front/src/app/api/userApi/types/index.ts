export type User = {
    id: number,
    first_name: string,
    last_name: string,
    middle_name: string | null,
    description: string | null,
    phone: string;
    email: string;
}

export type UpdateUserRequest = {
    first_name: string,
    last_name: string,
    middle_name: string,
    description: string,
    phone: string;
    email: string;
}
