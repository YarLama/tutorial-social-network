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
        })
    })
})

export const { useCreatePhotoMutation, useSetAvatarStateMutation } = photoApi;