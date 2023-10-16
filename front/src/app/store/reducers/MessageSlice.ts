import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUserInfoFromLocalToken } from "../../helpers/common/auth/tokenHelpers"
import { MessageModelType } from "../../helpers/types/models"

type PenPalUser = {
    id: number,
    messages: MessageModelType[]
}

interface MessageState {
    penPalUsers: PenPalUser[]
}

const authUser = getUserInfoFromLocalToken();
const messagesToMyself: PenPalUser = {
    id: authUser.id as number,
    messages: []
}

const initialState: MessageState = {
    penPalUsers: [messagesToMyself]
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<MessageModelType[]>) {
            let messages = action.payload;
            const combinedUserIdValue = messages.flatMap(message => [message.from_userId, message.to_userId]);
            const uniqueUserIdValues = [...new Set(combinedUserIdValue)].filter(id => id != authUser.id);
            const penPalUsers: PenPalUser[] = [...state.penPalUsers].map(penPalUser => {
                if (penPalUser.id === authUser.id) {
                    const myselfMessages = messages.filter(message => message.from_userId === message.to_userId);
                    return {...penPalUser, messages: myselfMessages}
                }
                return penPalUser;
            });

            uniqueUserIdValues.forEach(id => {
                const penPalMessages = messages.filter(message => [message.from_userId, message.to_userId].includes(id));
                const penPalUser: PenPalUser = {
                    id: id,
                    messages: penPalMessages
                }
                penPalUsers.push(penPalUser);
            });

            state.penPalUsers = penPalUsers;
        },
    }
})
