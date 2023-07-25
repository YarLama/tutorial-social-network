import { AuthRegRequest, AuthRegRequestErrors } from "../../../app/api/authApi/types"

export type RegistrationFormValues = AuthRegRequest & {confirm_password: string}
export type RegistrationFormValuesErrors = AuthRegRequestErrors & {confirm_password?: string | null}