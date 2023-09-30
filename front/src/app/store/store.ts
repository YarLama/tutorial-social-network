import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api from "../api";
import authReducer from '../store/reducers/AuthSlice';
import postReducer from '../store/reducers/PostSlice';
import userReducer from '../store/reducers/UserSlice';
import commentReducer from '../store/reducers/CommentSlice';

const rootReducer = combineReducers({
    authReducer,
    postReducer,
    userReducer,
    commentReducer,
    [api.reducerPath]: api.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']