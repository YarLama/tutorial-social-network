import { ILoginValues } from "./types";

export const prepareLoginData = (email: string, password: string): string => {

    const body: ILoginValues = {
        email: email,
        password: password
    }

    return JSON.stringify(body)
}