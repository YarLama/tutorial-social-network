import api from "..";
import { CommentInfo } from "../../helpers/types/common";
import { CommentModelType } from "../../helpers/types/models";
import { CommentCreateRequest, CommentUpdateRequest } from "./types";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostComments: builder.query<CommentModelType[], any>({
            query: (id) => `/comments/post/${id}`
        }),
        getPostCommentsInfo: builder.query<CommentInfo, any>({
            query: (id) => `/comments/post/${id}/info`,
        }),
        createComment: builder.mutation<any, CommentCreateRequest>({
            query: (data) => ({
                url: `/comments`,
                method: 'POST',
                body: data
            })
        }),
        updateComment: builder.mutation<any, {id: number, data: CommentUpdateRequest}>({
            query: (request) => ({
                url: `/comments/${request.id}`,
                method: 'PUT',
                body: request.data
            })
        }),
        deleteComment: builder.mutation<any, {id: number}>({
            query: (request) => ({
                url: `/comments/${request.id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetPostCommentsQuery, useGetPostCommentsInfoQuery } = commentApi;