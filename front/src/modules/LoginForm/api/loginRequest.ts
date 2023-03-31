import axios, { AxiosError, AxiosResponse } from "axios"
import { prepareLoginData } from "../helpers/prepareSubmit";
import { Token } from "../helpers/types";


export const getLoginToken = async (email: string, password: string): Promise<Token> => { 
    try {
        const responce: AxiosResponse = await axios.post(`http://localhost:7000/api/auth/login`, prepareLoginData(email, password), {
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        });
        const token: Token = responce.data;
        return token;
    } catch (e) {
        const error = e as AxiosError;
        const errorMessage = error.response?.status === 401 ? 'Неправильный логин или пароль' : 'Login: Something went wrong'
        throw Error(errorMessage)
    }
}
