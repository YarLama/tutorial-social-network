import { ILoginErrors, ILoginValues } from "./types";

type ValidateResult = {
    isValid: boolean;
    errorMessage: string | null;
}

const validate = (foo: () => ValidateResult['errorMessage']): ValidateResult => {
    let result: ValidateResult = {
        isValid: false,
        errorMessage: null
    }

    result.isValid = !foo();
    result.errorMessage = foo();

    return result;
}

const validateEmail = (email: ILoginValues['email']): ValidateResult => {
    return validate(() => {
        let error = null

        if (email.length === 0) error = 'Введите почту'

        return error;
    })
    
}

const validatePassword = (password: ILoginValues['password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (password.length === 0) error = 'Введите пароль'

        return error;
    })
}

export const validateLoginValues = (values: ILoginValues): ILoginErrors => {
    const errors: ILoginErrors = {};
    const email = validateEmail(values.email);
    const password = validatePassword(values.password);

    email.isValid ? null : errors.email = email.errorMessage;
    password.isValid ? null : errors.password = password.errorMessage;
    return errors;
}