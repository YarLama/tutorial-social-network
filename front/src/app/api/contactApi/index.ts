import api from "..";
import { ContactModelType } from "../../helpers/types/models";
import { ContactCreateRequest, ContactDeleteRequest, ContactUpdateRequest } from "./types";


export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query<ContactModelType, any>({
            query: (id) => `/contacts/${id}`
        }),
        createContact: builder.mutation<ContactModelType, ContactCreateRequest>({
            query: (data) => ({
                url: `/contacts`,
                method: 'POST',
                body: data
            })
        }),
        updateContact: builder.mutation<ContactModelType, ContactUpdateRequest>({
            query: (data) => ({
                url: `/contacts/${data.id}`,
                method: 'PUT',
                body: {
                    userId: data.userId,
                    description: data.description
                }
            })
        }),
        deleteContact: builder.mutation<any, ContactDeleteRequest>({
            query: (data) => ({
                url: `/contacts/${data.id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateContactMutation,
    useGetContactQuery,
    useDeleteContactMutation,
    useUpdateContactMutation
} = contactApi;
