import { apiInfo } from "../../constants";

export const replaceWithId = (url: string, id: any): string => {
    if (id === null) return '';
    return url.replace(':id', id.toString())
}

export const getImageUrl = (image: string | File | null | undefined): string | undefined => {
    console.log(image)
    return image? 
        typeof image === 'string'?
        `${apiInfo.IMAGE_STORAGE_URL}/${image}`
        : image instanceof File?
            URL.createObjectURL(image)
        : undefined
    : undefined;
}

export const getLocalImageUrl = (image: string | File | null | undefined): string | undefined => {
    return image? 
        typeof image === 'string'?
            image
        : image instanceof File?
            URL.createObjectURL(image)
        : undefined
    : undefined;
}