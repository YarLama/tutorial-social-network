import api from "..";
import { IUser } from "./types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], any>({
            query: () => '/users'
        }),
        getUserById: builder.query<IUser, any>({
            query: (id) => `/users/${id}`
        })
    })
})

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;