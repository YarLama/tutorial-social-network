import api from "..";
import { CommentInfo } from "../../helpers/types/common";
import { CommentModelType } from "../../helpers/types/models";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostComments: builder.query<CommentModelType[], any>({
            query: (id) => `/comments/post/${id}`
        }),
        getPostCommentsInfo: builder.query<CommentInfo, any>({
            query: (id) => `/comments/post/${id}/info`,
        }),
    })
})

export const { useGetPostCommentsQuery, useGetPostCommentsInfoQuery } = commentApi;