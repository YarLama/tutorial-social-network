import { validate } from "../../../app/helpers/common/form";
import { getPhoneWithoutSymbols } from "../../../app/helpers/common/text";
import { ValidateResult } from "../../../app/helpers/types/form";
import { RegistrationFormValues, RegistrationFormValuesErrors } from "./types";

const validateFirstName = (firstName: RegistrationFormValues['first_name']): ValidateResult => {
    return validate(() => {
        let error = null

        if (firstName.length === 0) error = 'Введите имя'
        if (firstName.length < 4 || firstName.length > 16) error = 'Имя должно содержать от 4 до 16 символов'

        return error;
    })  
}

const validateLastName = (lastName: RegistrationFormValues['last_name']): ValidateResult => {
    return validate(() => {
        let error = null

        if (lastName.length === 0) error = 'Введите Фамилию'
        if (lastName.length < 4 || lastName.length > 16) error = 'Фамилия должна содержать от 4 до 16 символов'

        return error;
    })  
}

const validatePhone = (phone: RegistrationFormValues['phone']): ValidateResult => {
    return validate(() => {
        let error = null
        let digitsOnly = getPhoneWithoutSymbols(phone);
        let phoneRegExp: RegExp = /^[78]\d{10}$/;

        if (phone.length === 0) return error = 'Введите номер телефона' 
        if (!phoneRegExp.test(digitsOnly)) return error = 'Неверный формат телефона (+7 (XXX)-XXX-XX-XX)'

        return error;
    })  
}

const validateEmail = (email: RegistrationFormValues['email']): ValidateResult => {
    return validate(() => {
        let error = null
        let emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) return error = 'Введите почту'
        if (!emailRegExp.test(email)) return error = 'Неверный формат почты'
        return error;
    })
    
}

const validatePassword = (password: RegistrationFormValues['password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (password.length === 0) error = 'Введите пароль'
        if (password.length < 4 || password.length > 16) error = 'Пароль должен содержать от 4 до 16 символов'

        return error;
    })
}

const validateConfirmPassword = (password: RegistrationFormValues['password'], confirm_password: RegistrationFormValues['confirm_password']): ValidateResult => {
    return validate(() => {
        let error = null

        if (!(confirm_password === password)) error = 'Пароли не совпадают'

        return error;
    })
}

export const validateRegistrationValues = (values: RegistrationFormValues): RegistrationFormValuesErrors => {
    const errors: RegistrationFormValuesErrors = {};
    const firstName = validateFirstName(values.first_name);
    const lastName = validateLastName(values.last_name);
    const phone = validatePhone(values.phone);
    const email = validateEmail(values.email);
    const password = validatePassword(values.password);
    const confirm_password = validateConfirmPassword(values.password, values.confirm_password)

    firstName.isValid ? null : errors.first_name = firstName.errorMessage;
    lastName.isValid ? null : errors.last_name = lastName.errorMessage;
    phone.isValid ? null : errors.phone = phone.errorMessage;
    email.isValid ? null : errors.email = email.errorMessage;
    password.isValid ? null : errors.password = password.errorMessage;
    confirm_password.isValid ? null : errors.confirm_password = confirm_password.errorMessage;
    return errors;
}