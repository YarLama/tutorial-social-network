import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfoFromLocalToken, parseJwt, removeLocalToken, setLocalToken } from "../../helpers/tokenHelpers";
import { AuthUserInfo, IUser } from "../../helpers/types/common";

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
        login(state, action: PayloadAction<string>) {
            setLocalToken(action.payload);
            const user: IUser = parseJwt(action.payload)
            state.user.id = user.id;
            state.user.email = user.email;
            state.isAuthenticated = true;
        },
        logout(state) {
            removeLocalToken();
            state.user.id = null;
            state.user.email = null;
            state.isAuthenticated = false;
        },
    }
})

export default authSlice.reducer;