import { AuthRegRequest } from "../../../app/api/authApi/types"
import { getPhoneWithoutSymbols } from "../../../app/helpers/common/text";


export const prepareRegistrationData = (firstName: string, lastName: string, phone:string, email: string, password: string): AuthRegRequest => {

    const body: AuthRegRequest = {
        first_name: firstName,
        last_name: lastName,
        phone: getPhoneWithoutSymbols(phone),
        email: email,
        password: password
    }

    return body;
}