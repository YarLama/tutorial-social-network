import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../../api/photoApi/types";
import { User } from "../../api/userApi/types";

interface UserState {
    user: User | null;
    avatar: Photo | null;
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
        },
        setAvatar(state, action: PayloadAction<Photo>) {
            state.avatar = action.payload;
        },
        setUserAndAvatar(state, action: PayloadAction<UserState>) {
            state.user = action.payload.user;
            state.avatar = action.payload.avatar;
        }
    }
})

export default userSlice.reducer;