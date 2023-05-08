import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootApi from "../api";
import { authApi } from "../api/authApi";
import authReducer from '../store/reducers/AuthSlice'

const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]: authApi.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']