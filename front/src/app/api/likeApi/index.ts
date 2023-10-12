import api from "..";
import { LikesInfo } from "../../helpers/types/common";
import { LikeCommentCreateRequest, LikePostCreateRequest } from "./types";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostLikesInfo: builder.query<LikesInfo, any>({
            query: (id) => `/likes/post/${id}/info`
        }),
        getCommentLikesInfo: builder.query<LikesInfo, any>({
            query: (id) => `/likes/comment/${id}/info`
        }),
        createLikePost: builder.mutation<any, LikePostCreateRequest>({
            query: (data) => ({
                url: `/likes/post`,
                method: `POST`,
                body: data
            })
        }),
        createLikeComment: builder.mutation<any, LikeCommentCreateRequest>({
            query: (data) => ({
                url: `/likes/comment`,
                method: `POST`,
                body: data
            })
        }),
        deleteLikePost: builder.mutation<any, {id: number}>({
            query: (request) => ({
                url: `/likes/post/${request.id}`,
                method: `DELETE`
            })
        }),
        deleteLikeComment: builder.mutation<any, {id: number}>({
            query: (request) => ({
                url: `/likes/comment/${request.id}`,
                method: `DELETE`
            })
        }),
    })
})

export const { useGetPostLikesInfoQuery, useGetCommentLikesInfoQuery } = likeApi;