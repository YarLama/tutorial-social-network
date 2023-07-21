import api from "..";
import { CommentInfo } from "../../helpers/types/common";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostCommentsInfo: builder.query<CommentInfo, any>({
            query: (id) => `/comments/post/${id}`
        }),
    })
})

export const { useGetPostCommentsInfoQuery } = commentApi;