import { authRegRequest } from "../../../app/api/authApi/types"


export const prepareLoginData = (firstName: string, lastName: string, phone:string, email: string, password: string): string => {

    const body: authRegRequest = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        password: password
    }

    return JSON.stringify(body)
}