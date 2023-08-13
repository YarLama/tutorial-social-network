import { UpdateUserRequest } from "../../../app/api/userApi/types";
import { getPhoneWithoutSymbols } from "../../../app/helpers/common/text";


export const prepareSettingUserData = (firstName: string, lastName: string, middleName: string | null, phone: string, email: string, description: string | null): UpdateUserRequest => {

    const body: UpdateUserRequest = {
        first_name: firstName,
        middle_name: middleName ?? '',
        last_name: lastName,
        phone: getPhoneWithoutSymbols(phone),
        email: email,
        description: description ?? ''
    }

    return body;
}

export const prepareSettingAvatarData = (userId: string, avatar: File | string): FormData => {

    const body = new FormData();

    body.append('userId', userId);
    if (avatar && !(typeof avatar === 'string')) {
        const blob = avatar?.slice(0, avatar.size, avatar.type);
        body.append('image', blob);
    }

    return body;
}