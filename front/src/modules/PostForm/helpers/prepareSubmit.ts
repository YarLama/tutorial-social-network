import { PostCreateRequest } from "../../../app/api/postApi/types";


export const preparePostCreateData = (title: string, content: string | undefined,  image: File | undefined, userId: string): FormData => {
    // const body: PostCreateRequest = {
    //     title: '',
    //     content: content ?? '',
    //     image: image,
    //     userId: userId
    // }

    const body = new FormData();
    body.append('title', '');
    body.append('content', content ?? '');
    body.append('userId', userId.toString());
    if (image) {
        const blob = image?.slice(0, image.size, image.type);
        body.append('image', blob);
    }

    return body;
}