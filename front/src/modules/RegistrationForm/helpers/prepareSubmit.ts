import { AuthRegRequest } from "../../../app/api/authApi/types"


export const prepareRegistrationData = (firstName: string, lastName: string, phone:string, email: string, password: string): AuthRegRequest => {

    const phoneWithoutSymbols = phone.replace(/\D/g, '');

    const body: AuthRegRequest = {
        first_name: firstName,
        last_name: lastName,
        phone: phoneWithoutSymbols,
        email: email,
        password: password
    }

    return body;
}