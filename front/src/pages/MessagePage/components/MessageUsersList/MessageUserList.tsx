import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import MessageUser from '../MessageUser/MessageUser';
import './styles/style.scss'

interface IMessageUsersListProps {
    currentUserId: number;
}

const MessageUserList: React.FC<IMessageUsersListProps> = ({currentUserId}) => {

    const { penPalUsers, currentPenPalUserInfo } = useAppSelector(state => state.messageReducer)
    const { id: authIdUser } = useAppSelector(state => state.authReducer.authUserInfo);
    const [ isHidden, setIsHidden ] = useState<boolean>(false);
    const { isMobile } = useWindowSize();
    const userListClassnames = ["message-user-list"];

    const hideUserListMobile = () => {
        if (isMobile) {
            if (currentPenPalUserInfo.id === 0) {
                setIsHidden(false);
            } else {
                setIsHidden(true);
            }
        } else {
            setIsHidden(false);
        }
    }

    useEffect(() => {
        hideUserListMobile();
    }, [currentPenPalUserInfo])

    if (isHidden) userListClassnames.push("hidden")

    return (
        <div className={userListClassnames.join(' ')}>
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