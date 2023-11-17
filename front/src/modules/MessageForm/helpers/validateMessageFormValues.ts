import { validate } from "../../../app/helpers/common/form";
import { ValidateResult } from "../../../app/helpers/types/form";
import { MessageFormInitialValues, MessageFormValues, MessageFormValuesError } from "./types";


const validateEmptyContent = (content: MessageFormValues['content']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (content?.length === 0) error = 'Введите текст';

        return error;
    })
}

const validateEmptyImage = (image: MessageFormValues['image']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (!image) error = 'Файл не прикреплен';

        return error;
    })
}

const validateChangeContent = (content: MessageFormValues['content'], initialContent: MessageFormInitialValues['update']['content']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (content === initialContent) error = 'Текст сообщение не изменился';

        return error;
    })
}

const validateChangeImage = (image: MessageFormValues['image'], initialImage: MessageFormInitialValues['update']['image']): ValidateResult => {
    return validate(() => {
        let error = null;
        let imageFileName;
        let imageErrorCondition = (!!image === !!initialImage);
        const initialFileName = initialImage ? (initialImage as string).split('/').slice(-1)[0] : '';
        if (image instanceof File) imageFileName = image.name;
        if (typeof image === 'string') imageFileName = image;
        if (!!image) imageErrorCondition = imageErrorCondition && (imageFileName === initialFileName);
        if (imageErrorCondition) error = 'Изображение не изменилось'

        return error;
    })
}

export const validateMessageFormCreateValues = (values: MessageFormValues): MessageFormValuesError => {
    const errors: MessageFormValuesError = {};
    const content = validateEmptyContent(values.content);
    const image = validateEmptyImage(values.image);

    content.isValid || image.isValid ? null: errors.content = 'Введите текст или прикрепите файл';

    return errors;
}

export const validateMessageFormUpdateValues = (values: MessageFormValues, initialValues: MessageFormInitialValues['update']): MessageFormValuesError => {
    const errors: MessageFormValuesError = {};
    const isContentChanged = validateChangeContent(values.content, initialValues.content);
    const isImageChanged = validateChangeImage(values.image, initialValues.image);
    const emptyContent = validateEmptyContent(values.content);
    const emptyImage = validateEmptyImage(values.image);

    if (!isContentChanged.isValid && !isImageChanged.isValid) errors.content = 'Ничего не изменилось';
    if (!emptyContent.isValid && !emptyImage.isValid) errors.content = 'Все поля не могут быть пустыми'
    return errors;
}