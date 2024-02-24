import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactModelType, ContactWithUserInfoType } from "../../helpers/types/models";

interface ContactState {
    contacts: ContactWithUserInfoType[];
}

const initialState: ContactState = {
    contacts: []
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContacts(state, action: PayloadAction<ContactWithUserInfoType[]>) {
            state.contacts = action.payload;
        },
        addContact(state, action: PayloadAction<ContactWithUserInfoType>) {
            const contact = action.payload;
            const contacts = [...state.contacts];
            const contactExist = contacts.find(elem => elem.id === contact.id);

            if(!contactExist) {
                contacts.push(contact);
                state.contacts = contacts;
            }
        },
        updateContact(state, action: PayloadAction<ContactWithUserInfoType>) {
            const contact = action.payload;
            const contacts = [...state.contacts];
            const updatedContacts = contacts.map(elem => elem.id === contact.id ? contact : elem);
            state.contacts = updatedContacts;
        },
        deleteContact(state, action: PayloadAction<ContactModelType>) {
            const contact = action.payload;
            const contacts = [...state.contacts];
            const contactsWithoutDeletedContact = contacts.filter(elem => elem.id !== contact.id);
            state.contacts = contactsWithoutDeletedContact;
        },
        resetContacts: () => initialState
    }
})

export default contactSlice.reducer