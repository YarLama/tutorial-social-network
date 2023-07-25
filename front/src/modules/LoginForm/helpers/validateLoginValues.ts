import { AuthLoginRequest, AuthLoginRequestErrors } from "../../../app/api/authApi/types";
import { validate } from "../../../app/helpers/common/form";
import { ValidateResult } from "../../../app/helpers/types/form";

const validateEmail = (email: AuthLoginRequest['email']): ValidateResult => {
    return validate(() => {
        let error = null

        if (email.length === 0) error = 'Введите почту'

        return error;
    })
    
}

const validatePassword = (password: AuthLoginRequest['password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (password.length === 0) error = 'Введите пароль'

        return error;
    })
}

export const validateLoginValues = (values: AuthLoginRequest): AuthLoginRequestErrors => {
    const errors: AuthLoginRequestErrors = {};
    const email = validateEmail(values.email);
    const password = validatePassword(values.password);

    email.isValid ? null : errors.email = email.errorMessage;
    password.isValid ? null : errors.password = password.errorMessage;
    return errors;
}