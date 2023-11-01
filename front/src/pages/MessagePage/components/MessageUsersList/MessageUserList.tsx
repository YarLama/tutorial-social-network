import React from 'react';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import MessageUser from '../MessageUser/MessageUser';

interface IMessageUsersListProps {
    currentUserId: number;
}

const MessageUserList: React.FC<IMessageUsersListProps> = ({currentUserId}) => {

    const { penPalUsers } = useAppSelector(state => state.messageReducer)
    const { id: authIdUser } = useAppSelector(state => state.authReducer.authUserInfo);

    return (
        <div className="message-user-list">
            {penPalUsers.map(penPalUser => {
                const lastMessageToMe = [...penPalUser.messages].reverse().find(message => message.to_userId === authIdUser)
                const lastMessage = lastMessageToMe?.content && lastMessageToMe?.content.length > 0 ? 
                    lastMessageToMe?.content 
                : lastMessageToMe?.image ? 
                    'Photo'
                    : null;
                return <MessageUser 
                    key={penPalUser.id} 
                    userId={penPalUser.id} 
                    lastMessage={lastMessage} 
                    isSelected={currentUserId === penPalUser.id}
                />
            })}
        </div>
    );
};

export default MessageUserList;