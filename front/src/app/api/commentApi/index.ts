import api from "..";
import { CommentInfo } from "../../helpers/types/common";
import { CommentModelType } from "../../helpers/types/models";
import { CreateCommentRequest, UpdateCommentRequest } from "./types";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostComments: builder.query<CommentModelType[], any>({
            query: (id) => `/comments/post/${id}`
        }),
        getPostCommentsInfo: builder.query<CommentInfo, any>({
            query: (id) => `/comments/post/${id}/info`,
        }),
        createComment: builder.mutation<any, CreateCommentRequest>({
            query: (data) => ({
                url: `/comments`,
                method: 'POST',
                body: data
            })
        }),
        updateComment: builder.mutation<any, {id: number, data: UpdateCommentRequest}>({
            query: ({id, data}) => ({
                url: `/comments/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteComment: builder.mutation<any, {id: number}>({
            query: (id) => ({
                url: `/comment/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetPostCommentsQuery, useGetPostCommentsInfoQuery } = commentApi;