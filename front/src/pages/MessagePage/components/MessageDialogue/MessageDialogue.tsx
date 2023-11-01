import React from 'react';
import { useGetUserByIdQuery } from '../../../../app/api/userApi';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { LoaderRing } from '../../../../UI';
import MessageLetter from '../MessageLetter/MessageLetter';
import './styles/style.scss'

interface IMessageDialogueProps {
    penPalUserId: number;
}

const MessageDialogue: React.FC<IMessageDialogueProps> = ({penPalUserId}) => {

    const {penPalUsers} = useAppSelector(state => state.messageReducer);
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const currentUser = penPalUsers.find(penPalUser => penPalUser.id === penPalUserId);
    const {currentPenPalUserInfo} = useAppSelector(state => state.messageReducer);

    const sortByGroup = (arr?: MessageModelType[]): MessageModelType[][] => {
        if (!arr) return []
        const finalArray = [];
        let currentGroup: MessageModelType[] = [];

        arr.forEach(message => {
            if (currentGroup.length === 0 || currentGroup[0].from_userId === message.from_userId) {
                currentGroup.push(message);
            } else {
                finalArray.push(currentGroup);
                currentGroup = [message];
            }
        });

        if (currentGroup.length > 0) finalArray.push(currentGroup)
        
        return finalArray;
    }

    const sortedMessages = sortByGroup(currentUser?.messages);

    if (penPalUserId <= 0) return <div className='message-dialogue-empty'>Choose your dialogue</div>

    return (
        <div className='message-dialogue'>
            {
                sortedMessages.map(messageGroup => {
                    const isOwner = messageGroup[0].from_userId === authId;
                    const penPalName = isOwner ? 'I' : currentPenPalUserInfo.name ?? "Pen Pal";
                    return <MessageLetter key={messageGroup[0].id} penPalName={penPalName} messages={messageGroup} owner={true}/>    
                })
            }
        </div>
    );
};

export default MessageDialogue;