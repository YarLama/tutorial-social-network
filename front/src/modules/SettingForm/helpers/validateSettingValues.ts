import { validate } from "../../../app/helpers/common/form";
import { getPhoneWithoutSymbols } from "../../../app/helpers/common/text";
import { ValidateResult } from "../../../app/helpers/types/form";
import { SettingFormErrors, SettingFormValues } from "./types";

const validateFirstName = (firstName: SettingFormValues['firstName']): ValidateResult => {
    return validate(() => {
        let error = null

        if (firstName.length === 0) error = 'Введите имя'
        if (firstName.length < 4 || firstName.length > 16) error = 'Имя должно содержать от 4 до 16 символов'

        return error;
    })  
}

const validateLastName = (lastName: SettingFormValues['lastName']): ValidateResult => {
    return validate(() => {
        let error = null

        if (lastName.length === 0) error = 'Введите Фамилию'
        if (lastName.length < 4 || lastName.length > 16) error = 'Фамилия должна содержать от 4 до 16 символов'

        return error;
    })  
}

const validateMiddleName = (middleName: SettingFormValues['middleName']): ValidateResult => {
    return validate(() => {

        let error = middleName ? 
        (middleName.length < 4 || middleName.length > 16) ? 
            'Отчество должно содержать от 4 до 16 символов' 
            : null 
        : null

        return error;
    })  
}

const validateEmail = (email: SettingFormValues['email']): ValidateResult => {
    return validate(() => {
        let error = null
        let emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) return error = 'Введите почту'
        if (!emailRegExp.test(email)) return error = 'Неверный формат почты'
        return error;
    })
    
}

const validatePhone = (phone: SettingFormValues['phone']): ValidateResult => {
    return validate(() => {
        let error = null
        let digitsOnly = getPhoneWithoutSymbols(phone);
        let phoneRegExp: RegExp = /^[78]\d{10}$/;

        if (phone.length === 0) return error = 'Введите номер телефона' 
        if (!phoneRegExp.test(digitsOnly)) return error = 'Неверный формат телефона (+7 (XXX)-XXX-XX-XX)'

        return error;
    })  
}

const validateImage = (image: SettingFormValues['avatar']): ValidateResult => {
    return validate(() => {
        let error = null;

        if (!image) error = 'Файл не прикреплен';

        return error;
    })
}

export const validateSettingValues = (values: SettingFormValues): SettingFormErrors => {
    const errors: SettingFormErrors = {};
    const firstName = validateFirstName(values.firstName);
    const lastName = validateLastName(values.lastName);
    const middleName = validateMiddleName(values.middleName);
    const phone = validatePhone(values.phone);
    const email = validateEmail(values.email);
    const avatar = validateImage(values.avatar);


    firstName.isValid ? null : errors.firstName = firstName.errorMessage;
    lastName.isValid ? null : errors.lastName = lastName.errorMessage;
    middleName.isValid ? null : errors.middleName = middleName.errorMessage;
    phone.isValid ? null : errors.phone = phone.errorMessage;
    email.isValid ? null : errors.email = email.errorMessage;
    return errors;
}