import api from "..";
import { Photo } from "./types";

export const photoApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPhoto: builder.mutation<Photo, FormData>({
            query: (data) => ({
                url: `/photos`,
                method: 'POST',
                body: data
            })
        }),
        setAvatarState: builder.mutation<any, any>({
            query: (id) => ({
                url: `/photos/${id}`,
                method: 'PUT',
            })
        }),
        deletePhoto: builder.mutation<any, any>({
            query: (id) => ({
                url: `/photos/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useCreatePhotoMutation, useSetAvatarStateMutation, useDeletePhotoMutation } = photoApi;