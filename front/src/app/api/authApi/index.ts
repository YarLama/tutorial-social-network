import api from '..';
import { authLoginRequest, authRegRequest, authResponce } from './types';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<authResponce, authLoginRequest>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        registration: builder.mutation<authResponce, authRegRequest>({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data 
            })
        })
    })
});

export const {useLoginMutation, useRegistrationMutation} = authApi

