import api from '..';
import { AuthLoginRequest, AuthRegRequest, AuthResponce } from './types';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponce, AuthLoginRequest>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        registration: builder.mutation<AuthResponce, AuthRegRequest>({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data 
            })
        })
    })
});

export const {useLoginMutation, useRegistrationMutation} = authApi

