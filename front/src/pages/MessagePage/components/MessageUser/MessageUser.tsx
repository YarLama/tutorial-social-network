import React from 'react';
import { userApi } from '../../../../app/api/userApi';
import { getImageUrl } from '../../../../app/helpers/http';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { Avatar } from '../../../../components';
import './styles/style.scss'

interface IMessageUserProps {
    userId: number;
    lastMessage: string | null;
}

const MessageUser: React.FC<IMessageUserProps> = ({userId, lastMessage}) => {

    const { data: avatarData } = userApi.useGetUserAvatarQuery(userId);
    const { data: userData } = userApi.useGetUserByIdQuery(userId);
    const { id: authUserId } = useAppSelector(state => state.authReducer.authUserInfo)

    return (
        <div className='message-user-box'>
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