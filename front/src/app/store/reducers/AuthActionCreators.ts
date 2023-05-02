import { getLocalToken, isLocalTokenActual } from "../../helper/tokenHelpers";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";

export const checkAuth = () => async (dispatch: AppDispatch) => {
    isLocalTokenActual() 
    ? dispatch(authSlice.actions.authorizationSuccess(getLocalToken())) 
    : dispatch(authSlice.actions.authorizationFailed())
}