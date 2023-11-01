import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getUserInfoFromLocalToken } from "../../helpers/common/auth/tokenHelpers"
import { MessageModelType } from "../../helpers/types/models"

type PenPalUser = {
    id: number,
    messages: MessageModelType[]
}

type PenPalUserInfo = {
    id: number,
    name: string | null
}

interface MessageState {
    penPalUsers: PenPalUser[],
    currentPenPalUserInfo: PenPalUserInfo
}

const messagesToMyself: PenPalUser = {
    id: getUserInfoFromLocalToken().id as number ?? 0,
    messages: []
}

const initialState: MessageState = {
    penPalUsers: [messagesToMyself],
    currentPenPalUserInfo: {
        id: 0,
        name: null
    }
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<MessageModelType[]>) {
            const authUser = getUserInfoFromLocalToken();
            let messages = action.payload;
            const combinedUserIdValue = messages.flatMap(message => [message.from_userId, message.to_userId]);
            const uniqueUserIdValues = [...new Set(combinedUserIdValue)].filter(id => id != authUser.id);
            const penPalUsers: PenPalUser[] = [messagesToMyself].map(penPalUser => {
                if ((penPalUser.id === authUser.id) || (penPalUser.id === 0)) {
                    const myselfMessages = messages.filter(message => message.from_userId === message.to_userId);
                    return {id: authUser.id as number, messages: myselfMessages}
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
        addMessage(state, action: PayloadAction<MessageModelType>) {
            const message = action.payload;
            const penPalUsers = [...state.penPalUsers];
            const penPalUser = penPalUsers.find(user => user.id === message.to_userId);

            if (penPalUser) {
                penPalUser.messages.push(message)
                state.penPalUsers = penPalUsers;
            }
        },
        updateMessage(state, action: PayloadAction<MessageModelType>) {
            const updatedMessage = action.payload;
            const penPalUsers = [...state.penPalUsers];
            const penPalUsersWithUpdatedMessage = penPalUsers.map(penPalUser => {
                if (penPalUser.id === updatedMessage.to_userId) {
                    const updatedMessages = penPalUser.messages.map(message => {
                        return message.id === updatedMessage.id ? updatedMessage : message;
                    })
                    return {...penPalUser, messages: updatedMessages}
                }
                return penPalUser;
            });
            state.penPalUsers = penPalUsersWithUpdatedMessage;
        },
        deleteMessage(state, action: PayloadAction<MessageModelType>) {
            const deletedMessage = action.payload;
            const penPalUsers = [...state.penPalUsers];
            const penPalUsersWithoutDeletedMessage = penPalUsers.map(penPalUser => {
                if (penPalUser.id === deletedMessage.to_userId) {
                    const updatedMessages = penPalUser.messages.filter(message => message.id !== deletedMessage.id)
                    return {...penPalUser, messages: updatedMessages}
                }
                return penPalUser;
            })
            state.penPalUsers = penPalUsersWithoutDeletedMessage;
        },
        setCurrentPenPalUserInfo(state, action: PayloadAction<PenPalUserInfo>) {
            state.currentPenPalUserInfo = action.payload;
        },
        resetMessages: () => initialState
    }
})

export default messageSlice.reducer
