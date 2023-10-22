import React from 'react';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import MessageUser from '../MessageUser/MessageUser';

const MessageUserList: React.FC = () => {

    const { penPalUsers } = useAppSelector(state => state.messageReducer)
    const { id: authIdUser } = useAppSelector(state => state.authReducer.authUserInfo);

    return (
        <div>
            {penPalUsers.map(penPalUser => {
                const lastMessageToMe = [...penPalUser.messages].reverse().find(message => message.to_userId === authIdUser)
                const lastMessage = lastMessageToMe?.content && lastMessageToMe?.content.length > 0 ? 
                    lastMessageToMe?.content 
                : lastMessageToMe?.image ? 
                    'Photo'
                    : null;
                console.log(lastMessageToMe, lastMessageToMe?.content, lastMessageToMe?.image)
                return <MessageUser key={penPalUser.id} userId={penPalUser.id} lastMessage={lastMessage}/>
            })}
        </div>
    );
};

export default MessageUserList;