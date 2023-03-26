import { ILoginErrors, ILoginValues } from "./types";

type ValidateResult = {
    isValid: boolean;
    errorMessage: string | null;
}

const validate = (foo: () => ValidateResult['errorMessage'], ): ValidateResult => {
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

        if (email.length < 6) error = 'Почта не может быть меньше 6'
        if (email.length > 16) error = 'Почта не может быть больше 16'

        return error;
    })
    
}

const validatePassword = (password: ILoginValues['password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (password.length < 2) error = 'Пароль не может быть меньше 2'
        if (password.length > 4) error = 'Пароль не может быть больше 4'

        return error;
    })
}

export const validateLoginValues = (values: ILoginValues): ILoginErrors => {
    const errors: ILoginErrors = {};
    const email = validateEmail(values.email);
    const password = validatePassword(values.password);
    console.log(email, password)

    email.isValid ? null : errors.email = email.errorMessage;
    password.isValid ? null : errors.password = password.errorMessage;
    console.log(errors)
    return errors;
}