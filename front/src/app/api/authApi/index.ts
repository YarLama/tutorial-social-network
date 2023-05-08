import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiInfo } from '../../helpers/http';
import { authLoginRequest, authRegRequest, authResponce } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiInfo.API_URL}/auth`
    }),
    endpoints: (builder) => ({
        login: builder.mutation<authResponce, authLoginRequest>({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        }),
        registration: builder.mutation<authResponce, authRegRequest>({
            query: (data) => ({
                url: '/registration',
                method: 'POST',
                body: data 
            })
        })
    })
})