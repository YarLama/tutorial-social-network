import api from "..";
import { LikesInfo } from "../../helpers/types/common";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPostLikesInfo: builder.query<LikesInfo, any>({
            query: (id) => `/likes/post/${id}/info`
        }),
        getCommentLikesInfo: builder.query<LikesInfo, any>({
            query: (id) => `/likes/comment/${id}/info`
        }),
    })
})

export const { useGetPostLikesInfoQuery, useGetCommentLikesInfoQuery } = likeApi;