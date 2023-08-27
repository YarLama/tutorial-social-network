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
            console.log(`SetUser`)
            console.log([`PAYLOAD`, action.payload])
            state.user = action.payload;
            console.log([`STATE`, state.user])
        },
        setAvatar(state, action: PayloadAction<Photo | null>) {
            console.log(`SetAvatar`)
            console.log([`PAYLOAD`, action.payload])
            state.avatar = action.payload;
            console.log([`STATE`, state.avatar])
        },
        setUserAndAvatar(state, action: PayloadAction<UserState>) {
            console.log(`setUserAndAvatar`)
            console.log([`PAYLOAD`, action.payload])
            state.user = action.payload.user;
            state.avatar = action.payload.avatar;
            console.log([`STATE`, state.user, state.avatar])
        }
    }
})

export default userSlice.reducer;