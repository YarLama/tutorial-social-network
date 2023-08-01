import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfoFromLocalToken, parseJwt, removeLocalToken, setLocalToken } from "../../helpers/common/auth/tokenHelpers";
import { AuthUserInfo } from "../../helpers/types/common";

interface AuthState {
    authUserInfo: AuthUserInfo;
    isAuthenticated: boolean;
}

const userInfo = getUserInfoFromLocalToken();

const initialState: AuthState = {
    authUserInfo: userInfo,
    isAuthenticated: !!userInfo.id
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            setLocalToken(action.payload);
            const user: AuthUserInfo = parseJwt(action.payload)
            state.authUserInfo.id = user.id;
            state.authUserInfo.email = user.email;
            state.isAuthenticated = true;
        },
        logout(state) {
            removeLocalToken();
            state.authUserInfo.id = null;
            state.authUserInfo.email = null;
            state.isAuthenticated = false;
        },
    }
})

export default authSlice.reducer;