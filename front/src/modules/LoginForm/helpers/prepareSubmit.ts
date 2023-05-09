import { authLoginRequest } from "../../../app/api/authApi/types"


export const prepareLoginData = (email: string, password: string): string => {

    const body: authLoginRequest = {
        email: email,
        password: password
    }

    return JSON.stringify(body)
}