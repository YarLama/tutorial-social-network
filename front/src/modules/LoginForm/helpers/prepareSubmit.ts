import { AuthLoginRequest } from "../../../app/api/authApi/types"


export const prepareLoginData = (email: string, password: string): AuthLoginRequest => {

    const body: AuthLoginRequest = {
        email: email,
        password: password
    }

    return body;
}