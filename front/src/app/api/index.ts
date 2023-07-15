import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";
import { apiInfo } from "../constants";
import { getLocalToken } from "../helpers/common/auth/tokenHelpers";
import { authSlice } from '../store/reducers/AuthSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: `${apiInfo.API_URL}`,
    prepareHeaders: (headers) => {
        const token = getLocalToken();
        if (token) headers.set('authorization', `Bearer ${token}`)
        return headers;
    }
})

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);
    if (result.error && result.error.status === 401) api.dispatch(authSlice.actions.logout())
    return result;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    endpoints: () => ({})
});

export default api;
