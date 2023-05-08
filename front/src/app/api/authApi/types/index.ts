export type authResponce = {
    token: string;
}

export type authLoginRequest = {
    email: string;
    password: string;
}

export type authRegRequest = {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string
}

export type LoginErrors = {
    email?: string | null;
    password?: string | null;
}