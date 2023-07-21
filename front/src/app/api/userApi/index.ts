import api from "..";
import { PostModelType } from "../../helpers/types/models";
import { IUser } from "./types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], any>({
            query: () => '/users'
        }),
        getUserById: builder.query<IUser, any>({
            query: (id) => `/users/${id}`
        }),
        getUserPosts: builder.query<PostModelType[], any>({
            query: (id) => `/users/${id}/posts`
        }),
    })
})

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;