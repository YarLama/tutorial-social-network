import { Photo } from "../../../api/photoApi/types";
import { User } from "../../../api/userApi/types";

export type PostModelType = {
    id: number;
    userId: number;
    content: string;
    title: string;
    image: string | null;
    is_commentable: boolean;
    createdAt: string;
    updatedAt: string;
}

export type CommentModelType = {
    id: number,
    content: string,
    postId: number,
    userId: number,
    createdAt: string
}

export type MessageModelType = {
    id: number,
    from_userId: number,
    to_userId: number,
    content: string,
    image: string | null,
    is_visible: boolean,
    createdAt: string,
    updatedAt: string
}

export type ContactModelType = {
    id: number;
    userId: number;
    targetUserId: number;
    description: string | null;
}

export type UserModelType = User & {avatar: Photo | null};
export type UserSearchModelType = User & {photos: Photo[]}
export type ContactWithUserInfoType = {
    id: number,
    description: string | null,
    user: UserSearchModelType
}