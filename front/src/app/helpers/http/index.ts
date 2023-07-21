import { apiInfo } from "../../constants";

export const replaceWithId = (url: string, id: any): string => {
    if (id === null) return '';
    return url.replace(':id', id.toString())
}

export const getImageUrl = (imageName: string | null): string | null => {
    return imageName ? `${apiInfo.IMAGE_STORAGE_URL}/${imageName}` : null;
}