
export type AuthUserInfo = {
    id: number | null;
    email: string | null;
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
