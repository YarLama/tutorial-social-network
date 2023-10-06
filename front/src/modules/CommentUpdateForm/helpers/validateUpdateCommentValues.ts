import { CommentCreateRequest, CommentCreateRequestErrors, CommentUpdateRequest } from "../../../app/api/commentApi/types"
import { validate } from "../../../app/helpers/common/form"
import { ValidateResult } from "../../../app/helpers/types/form"

const validateContent = (content: CommentUpdateRequest['content']): ValidateResult => {
    return validate(() => {
        let error = null;
        
        if (content.length === 0) error = 'Введите текст';

        return error;
    })
}

export const validateUpdateCommentValues = (values: CommentUpdateRequest): CommentCreateRequestErrors => {
    const errors: CommentCreateRequestErrors = {};
    const content = validateContent(values.content);

    content.isValid ? null : errors.content = content.errorMessage;

    return errors;
}