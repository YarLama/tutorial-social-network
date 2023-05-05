import { getLocalToken, isLocalTokenActual } from "../../helpers/tokenHelpers";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";

export const checkAuth = () => async (dispatch: AppDispatch) => {
    isLocalTokenActual() 
    ? dispatch(authSlice.actions.login(getLocalToken())) 
    : dispatch(authSlice.actions.logout())
}