export interface ILoginValues {
    email: string;
    password: string;
}

export interface ILoginErrors {
    email?: string | null;
    password?: string | null;
}