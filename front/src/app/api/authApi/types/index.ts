export type authResponce = {
    token: string;
}

export type authLoginRequest = {
    email: string;
    password: string;
}

export type authLoginRequestErrors = {
    email?: string | null;
    password?: string | null;
}

export type authRegRequest = {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string
}

export type authRegRequestErrors = {
    first_name?: string | null,
    last_name?: string | null,
    phone?: string | null,
    email?: string | null,
    password?: string | null
}