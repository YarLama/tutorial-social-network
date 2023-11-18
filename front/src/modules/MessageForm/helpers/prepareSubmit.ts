import { getImageUrl } from "../../../app/helpers/http";
import { MessageFormValues } from "./types";


export const prepareCreateMessageData = (values: MessageFormValues) => {
    const body = new FormData();
    body.append('from_userId', String(values.from_userId));
    body.append('to_userId', String(values.to_userId));
    body.append('content', values.content ?? '');
    body.append('is_visible', String(true));
    if (values.image && values.image instanceof File) {
        const blob = values.image.slice(0, values.image.size, values.image.type);
        body.append('image', blob);
    }

    return body;
}

export const prepareUpdateMessageData = async (values: MessageFormValues): Promise<FormData> => {
    const body = new FormData();
    body.append('from_userId', String(values.from_userId));
    body.append('to_userId', String(values.to_userId));
    body.append('content', values.content ?? '');
    body.append('is_visible', String(true));
    if (values.image && values.image instanceof File) {
        const blob = values.image.slice(0, values.image.size, values.image.type);
        body.append('image', blob);
    }
    if (values.image && (typeof values.image === 'string')) {
        const imageUrl = new URL(getImageUrl(values.image) as string)
        await fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => body.append('image', blob))
    }

    return body;
}