import { authRegRequest, authRegRequestErrors } from "../../../app/api/authApi/types";
import { ValidateResult } from "../../../app/helpers/types/form";

const validate = (foo: () => ValidateResult['errorMessage']): ValidateResult => {
    let result: ValidateResult = {
        isValid: false,
        errorMessage: null
    }

    result.isValid = !foo();
    result.errorMessage = foo();

    return result;
}


const validateFirstName = (firstName: authRegRequest['first_name']): ValidateResult => {
    return validate(() => {
        let error = null

        if (firstName.length === 0) error = 'Введите имя'

        return error;
    })  
}

const validateLastName = (lastName: authRegRequest['last_name']): ValidateResult => {
    return validate(() => {
        let error = null

        if (lastName.length === 0) error = 'Введите Фамилию'

        return error;
    })  
}

const validatePhone = (phone: authRegRequest['phone']): ValidateResult => {
    return validate(() => {
        let error = null

        if (phone.length === 0) error = 'Введите номер телефона'

        return error;
    })  
}

const validateEmail = (email: authRegRequest['email']): ValidateResult => {
    return validate(() => {
        let error = null

        if (email.length === 0) error = 'Введите почту'

        return error;
    })
    
}

const validatePassword = (password: authRegRequest['password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (password.length === 0) error = 'Введите пароль'

        return error;
    })
}

export const validateRegistrationValues = (values: authRegRequest): authRegRequestErrors => {
    const errors: authRegRequestErrors = {};
    const firstName = validateFirstName(values.first_name);
    const lastName = validateLastName(values.last_name);
    const phone = validatePhone(values.phone);
    const email = validateEmail(values.email);
    const password = validatePassword(values.password);

    firstName.isValid ? null : errors.first_name = firstName.errorMessage;
    lastName.isValid ? null : errors.last_name = lastName.errorMessage;
    phone.isValid ? null : errors.phone = phone.errorMessage;
    email.isValid ? null : errors.email = email.errorMessage;
    password.isValid ? null : errors.password = password.errorMessage;
    return errors;
}