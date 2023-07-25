export type PostCreateRequest = {
    title: string;
    content?: string;
    userId: number;
    image?: File;
}
export type PostCreateRequestErrors = {
    title?: string;
    content?: string;
    userId?: number;
    image?: File;
} 