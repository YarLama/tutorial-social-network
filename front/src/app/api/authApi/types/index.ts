export type AuthResponce = {
    token: string;
}

export type AuthLoginRequest = {
    email: string;
    password: string;
}

export type AuthLoginRequestErrors = {
    email?: string | null;
    password?: string | null;
}

export type AuthRegRequest = {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string
}

export type AuthRegRequestErrors = {
    first_name?: string | null,
    last_name?: string | null,
    phone?: string | null,
    email?: string | null,
    password?: string | null
}