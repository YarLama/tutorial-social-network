import { authLoginRequest } from "../../../app/api/authApi/types"


export const prepareLoginData = (email: string, password: string): authLoginRequest => {

    const body: authLoginRequest = {
        email: email,
        password: password
    }

    return body;
}