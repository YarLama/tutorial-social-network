import api from "..";
import { ContactModelType } from "../../helpers/types/models";


export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query<ContactModelType, any>({
            query: (id) => `/contacts/${id}`
        }),
        createContact: builder.mutation<ContactModelType, any>({
            query: (data) => ({
                url: `/contacts`,
                method: 'POST',
                body: data
            })
        }),
        updateContact: builder.mutation<ContactModelType, any>({
            query: ({id, data}) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteContact: builder.mutation<any, any>({
            query: (id) => ({
                url: `/contacts/${id}`,
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
