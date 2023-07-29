

export const preparePostUpdateData = (content: string | undefined, image: File | string | undefined, isCommentable: boolean): FormData => {

    const body = new FormData();
    body.append('title', '');
    body.append('content', content ?? '');
    body.append('is_commentable', String(isCommentable));
    if (image && !(typeof image === 'string')) {
        const blob = image?.slice(0, image.size, image.type);
        body.append('image', blob);
    }
    return body;
}