import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api/userApi/types";

interface UserState {
    user: User | null;
    avatar: string | null;
}

const initialState: UserState = {
    user: null,
    avatar: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        }
    }
})

export default userSlice.reducer;