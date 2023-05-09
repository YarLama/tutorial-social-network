import { authRegRequest } from "../../../app/api/authApi/types"


export const prepareRegistrationData = (firstName: string, lastName: string, phone:string, email: string, password: string): string => {

    const phoneWithoutSymbols = phone.replace(/\D/g, '');

    const body: authRegRequest = {
        first_name: firstName,
        last_name: lastName,
        phone: phoneWithoutSymbols,
        email: email,
        password: password
    }

    return JSON.stringify(body)
}