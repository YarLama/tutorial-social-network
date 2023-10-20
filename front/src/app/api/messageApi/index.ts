import api from "..";
import { MessageModelType } from "../../helpers/types/models";


export const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserMessages: builder.query<MessageModelType[], any>({
            query: () => `/messages/user`
        }),
        createMessage: builder.mutation<any, FormData>({
            query: (data) => ({
                url: `/messages`,
                method: 'POST',
                body: data
            })
        }),
        updateMessage: builder.mutation<any, any>({
            query: ({id, data}) => ({
                url: `/messages/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteMessage: builder.mutation<any, {id: number}>({
            query: (request) => ({
                url: `/messages/${request.id}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useCreateMessageMutation, useDeleteMessageMutation, useGetUserMessagesQuery, useUpdateMessageMutation} = messageApi;
