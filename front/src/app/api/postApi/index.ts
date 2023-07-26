import api from "..";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<any, FormData>({
            query: (data) => ({
                url: `/posts`,
                method: 'POST',
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

export const { useCreatePostMutation, useDeletePostMutation } = postApi;