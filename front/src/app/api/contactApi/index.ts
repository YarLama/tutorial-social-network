import api from "..";
import { CreateContactRequest, DeleteContactRequest, UpdateContactRequest } from "../../constants/types";
import { ContactModelType } from "../../helpers/types/models";


export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query<ContactModelType, any>({
            query: (id) => `/contacts/${id}`
        }),
        createContact: builder.mutation<ContactModelType, CreateContactRequest>({
            query: (data) => ({
                url: `/contacts`,
                method: 'POST',
                body: data
            })
        }),
        updateContact: builder.mutation<ContactModelType, UpdateContactRequest>({
            query: (data) => ({
                url: `/contacts/${data.targetUserId}`,
                method: 'PUT',
                body: {
                    userId: data.userId,
                    description: data.description
                }
            })
        }),
        deleteContact: builder.mutation<any, DeleteContactRequest["targetUserId"]>({
            query: (data) => ({
                url: `/contacts/${data}`,
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
