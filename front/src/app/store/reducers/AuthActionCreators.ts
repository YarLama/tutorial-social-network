import { isLocalTokenActual } from "../../helpers/common/auth/tokenHelpers";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";

export const checkAuth = () => (dispatch: AppDispatch) => {
    if (!isLocalTokenActual()) dispatch(authSlice.actions.logout())
}