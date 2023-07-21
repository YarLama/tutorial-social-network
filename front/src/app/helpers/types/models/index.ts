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