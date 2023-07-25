import { PostCreateRequest, PostCreateRequestErrors } from "../../../app/api/postApi/types"
import { validate } from "../../../app/helpers/common/form"
import { ValidateResult } from "../../../app/helpers/types/form";

const validateContent = (content: PostCreateRequest['content']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (content?.length === 0) error = 'Введите текст';

        return error;
    })
}

const validateImage = (image: PostCreateRequest['image']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (!image) error = 'Файл не прикреплен';

        return error;
    })
}

export const validatePostCreateValues = (values: PostCreateRequest): PostCreateRequestErrors => {
    const errors: PostCreateRequestErrors = {};
    const content = validateContent(values.content);
    const image =  validateImage(values.image);
    
    content.isValid || image.isValid ? null: errors.content = 'Введите текст или прикрепите файл'
    return errors;
}