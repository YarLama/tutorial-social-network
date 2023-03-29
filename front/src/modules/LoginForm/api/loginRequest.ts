import axios from "axios"
import { prepareLoginData } from "../helpers/prepareSubmit";


export const getLoginToken = async (email: string, password: string) => {
    try {
        const responce = await axios.post(`http://localhost:7000/api/auth/login`, prepareLoginData(email, password), {
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        });
        return responce.data;
    } catch (e) {
        throw Error('Something went wrong from Login')
    }
}
