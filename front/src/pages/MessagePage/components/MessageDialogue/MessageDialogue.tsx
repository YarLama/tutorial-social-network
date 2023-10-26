import React from 'react';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import './styles/style.scss'

interface IMessageDialogueProps {
    penPalUserId: number;
}

const MessageDialogue: React.FC<IMessageDialogueProps> = ({penPalUserId}) => {

    const {penPalUsers} = useAppSelector(state => state.messageReducer)
    const currentUser = penPalUsers.find(penPalUser => penPalUser.id === penPalUserId);
    const messages = currentUser?.messages;

    if (penPalUserId <= 0) return <div className='message-dialogue-empty'>Choose your dialogue</div>

    return (
        <div className='message-dialogue'>
            {messages?.map(message => <p key={message.id}>{message.content}</p>)}
        </div>
    );
};

export default MessageDialogue;