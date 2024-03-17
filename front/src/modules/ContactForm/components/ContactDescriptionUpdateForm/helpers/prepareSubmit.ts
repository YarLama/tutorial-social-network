import { ContactUpdateRequest } from "../../../../../app/api/contactApi/types";
import { getUserInfoFromLocalToken } from "../../../../../app/helpers/common/auth/tokenHelpers";
import { ContactDesriptionFormUpdateValues } from "./types";

const { id: authId } = getUserInfoFromLocalToken()

export const prepareContactDescriptionUpdateData = (values: ContactDesriptionFormUpdateValues, id: number): ContactUpdateRequest => {
    
    const requestData: ContactUpdateRequest = {
        id: id,
        userId: authId as number,
        description: values.description !== '' ? values.description : null
    }
    
    return requestData;
}