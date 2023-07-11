export interface IUser {
    id: number;
    email: string;
    roles: Array<any>
    exp: number;
    iat: number;
}

export type AuthUserInfo = {
    id: number | null;
    email: string | null;
}

export type UserImage = {
    id: number;
    src: string;
    isAvatar?: boolean;
    alt?: string;
}
export type PostImage = {
    src: string;
    alt?: string;
}