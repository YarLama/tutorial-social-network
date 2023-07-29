import { PostUpdateRequest, PostUpdateRequestErrors } from "../../../app/api/postApi/types";
import { validate } from "../../../app/helpers/common/form";
import { ValidateResult } from "../../../app/helpers/types/form";

const validateContent = (content: PostUpdateRequest['content']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (content?.length === 0) error = 'Введите текст';

        return error;
    })
}

const validateImage = (image: PostUpdateRequest['updatedImage']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (!image) error = 'Файл не прикреплен';

        return error;
    })
}

export const validatePostUpdateValues = (values: PostUpdateRequest): PostUpdateRequestErrors => {
    const errors: PostUpdateRequestErrors = {};
    const content = validateContent(values.content);
    const image =  validateImage(values.updatedImage);
    
    content.isValid || image.isValid ? null: errors.content = 'Введите текст или прикрепите файл';
    return errors;
}