import api from "..";
import { ContactModelType, UserSearchModelType, PostModelType, ContactWithUserInfoType } from "../../helpers/types/models";
import { Photo } from "../photoApi/types";
import { User } from "./types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], any>({
            query: () => '/users'
        }),
        getUsersByName: builder.query<UserSearchModelType[], any>({
            query: (name: string) => `users/${name}/search`
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
        getUserPhotos: builder.query<Photo[], any>({
            query: (id) => `/users/${id}/photos`
        }),
        getUserContacts: builder.query<ContactWithUserInfoType[], any>({
            query: (id) => `/users/${id}/contacts`
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

export const { 
    useGetAllUsersQuery, 
    useGetUsersByNameQuery,
    useGetUserByIdQuery, 
    useGetUserAvatarQuery, 
    useGetUserPostsQuery, 
    useUpdateUserMutation,
    useGetUserPhotosQuery,
    useGetUserContactsQuery
} = userApi;