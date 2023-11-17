import { MessageCreateRequest, MessageCreateRequestErrors, MessageUpdateRequest, MessageUpdateRequestErrors } from "../../../app/api/messageApi/types"

export type MessageFormValues = MessageCreateRequest | MessageUpdateRequest;
export type MessageFormValuesError = MessageCreateRequestErrors | MessageUpdateRequestErrors;

export type MessageFormInitialValues = {
    'create': MessageCreateRequest, 
    'update': MessageUpdateRequest
}