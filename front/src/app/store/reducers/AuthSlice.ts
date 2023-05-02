import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfoFromLocalToken, parseJwt } from "../../helper/tokenHelpers";
import { AuthUserInfo, IUser } from "../../helper/types/types";

interface AuthState {
    user: AuthUserInfo;
    isAuthenticated: boolean;
}

const userInfo = getUserInfoFromLocalToken();

const initialState: AuthState = {
    user: userInfo,
    isAuthenticated: !!userInfo.id
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorizationSuccess(state, action: PayloadAction<string>) {
            const user: IUser = parseJwt(action.payload)
            state.user.id = user.id;
            state.user.email = user.email;
            state.isAuthenticated = true;
        },
        authorizationFailed(state) {
            state.user.id = null;
            state.user.email = null;
            state.isAuthenticated = false;
        },
    }
})

export default authSlice.reducer;