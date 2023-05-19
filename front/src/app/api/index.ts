import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiInfo } from "../helpers/http";
import { getLocalToken } from "../helpers/tokenHelpers";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiInfo.API_URL}`,
        prepareHeaders: (headers) => {
            const token = getLocalToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({})
});

export default api;
