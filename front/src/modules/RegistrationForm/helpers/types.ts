import { authRegRequest, authRegRequestErrors } from "../../../app/api/authApi/types"

export type RegistrationFormValues = authRegRequest & {confirm_password: string}
export type RegistrationFormValuesErrors = authRegRequestErrors & {confirm_password?: string | null}