import api from "..";
import { PostCreateRequest } from "./types";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<any, FormData>({
            query: (data) => ({
                url: `/posts`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useCreatePostMutation } = postApi;