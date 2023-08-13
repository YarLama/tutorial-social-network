import api from "..";
import { PostModelType } from "../../helpers/types/models";
import { Photo } from "../photoApi/types";
import { User } from "./types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], any>({
            query: () => '/users'
        }),
        getUserById: builder.query<User, any>({
            query: (id) => `/users/${id}`
        }),
        getUserPosts: builder.query<PostModelType[], any>({
            query: (id) => `/users/${id}/posts`
        }),
        getUserAvatar: builder.query<Photo, any>({
            query: (id) => `/users/${id}/avatar`
        }),
        updateUser: builder.mutation<any, any>({
            query: ({id, data}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useGetUserAvatarQuery, useGetUserPostsQuery, useUpdateUserMutation } = userApi;