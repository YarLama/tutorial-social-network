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

export type UserModelType = User & {avatar: Photo | null};