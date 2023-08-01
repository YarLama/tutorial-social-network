
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

export type LikesInfo = {
    countLikes: number,
    isUserLikeOnwer: boolean
}

export type CommentInfo = {
    countComments: number,
    isUserCommented: boolean
}
