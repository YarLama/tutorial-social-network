import { validate } from "../../../../../app/helpers/common/form";
import { ValidateResult } from "../../../../../app/helpers/types/form";
import { ContactDesriptionFormUpdateValues, ContactDesriptionFormUpdateValuesError } from "./types";


const validateDescription = (description: ContactDesriptionFormUpdateValues['description']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (description) {
            if (description?.length > 254) error = 'Ограничение в 254 символа';
            if (description.length === 0) error = 'Введите текст';
        }
        
        return error;
    })
}

export const validateContactDescriptionUpdateFormValues = (values: ContactDesriptionFormUpdateValues): ContactDesriptionFormUpdateValuesError => {
    const errors: ContactDesriptionFormUpdateValuesError = {};
    const descriptionValidate = validateDescription(values.description);

    if (!descriptionValidate.isValid) errors.description = descriptionValidate.errorMessage;

    return errors;
}