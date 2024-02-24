import React from 'react';
import { userApi } from '../../../../app/api/userApi';
import { getImageUrl } from '../../../../app/helpers/http';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { Avatar } from '../../../../components';
import './styles/style.scss'

interface IMessageUserProps {
    userId: number;
    lastMessage: string | null;
    isSelected?: boolean;
}

const MessageUser: React.FC<IMessageUserProps> = ({userId, lastMessage, isSelected}) => {

    const { data: avatarData, isLoading: userLoading } = userApi.useGetUserAvatarQuery(userId, {skip: userId === 0});
    const { data: userData, isLoading: avatarLoading } = userApi.useGetUserByIdQuery(userId, {skip: userId === 0});
    const { id: authUserId } = useAppSelector(state => state.authReducer.authUserInfo)
    const dispatch = useAppDispatch();
    const messageClassName = ['message-user-box'];

    if (userLoading && avatarLoading) return null;

    if (isSelected) messageClassName.push('selected')
    if (lastMessage) lastMessage = lastMessage?.length > 20 ? lastMessage?.slice(0, 20).concat('...') : lastMessage;

    const handleClick = () => {
        if (userData) dispatch(messageSlice.actions.setCurrentPenPalUserInfo({
            id: userId,
            name: userData.first_name
        }))
    }

    return (
        <div className={messageClassName.join(' ')} onClick={handleClick}>
            <div className='message-user-avatar'>
                <Avatar size='s' src={avatarData ? getImageUrl(avatarData.image) : undefined}/>
            </div>
            <div className='message-user-info-box'>
                <div className='message-user-name'>
                    {userId === authUserId ? 'My Messages' : `${userData?.first_name}`}
                </div>
                <div className='message-user-short-last-message'>
                    {lastMessage ?? ''}
                </div>
            </div>
        </div>
    );
};

export default MessageUser;