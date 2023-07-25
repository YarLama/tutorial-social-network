import { ValidateResult } from "../../types/form";

export const validate = (foo: () => ValidateResult['errorMessage']): ValidateResult => {
    let result: ValidateResult = {
        isValid: false,
        errorMessage: null
    }

    result.isValid = !foo();
    result.errorMessage = foo();

    return result;
}