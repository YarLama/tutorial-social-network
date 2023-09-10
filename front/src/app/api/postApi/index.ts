import api from "..";
import { PostModelType } from "../../helpers/types/models";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.query<PostModelType, any>({
            query: (id) => `/posts/${id}`
        }),
        createPost: builder.mutation<PostModelType, FormData>({
            query: (data) => ({
                url: `/posts`,
                method: 'POST',
                body: data
            })
        }),
        updatePost: builder.mutation<PostModelType, any>({
            query: ({id, data}) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deletePost: builder.mutation<any, any>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useGetPostQuery, useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } = postApi;