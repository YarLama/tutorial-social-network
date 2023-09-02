import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from '../../../../app/api/photoApi/types';
import { useGetUserPhotosQuery } from '../../../../app/api/userApi';
import { User } from '../../../../app/api/userApi/types';
import { convetToFullName } from '../../../../app/helpers/common/text';
import { getImageUrl } from '../../../../app/helpers/http';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { Avatar } from '../../../../components';
import { UserPageDetail } from '../UserPageDetail/UserPageDetail';
import { UserPageToolkit } from '../UserPageToolkit/UserPageToolkit';
import { UserPhotosMediaViewer } from '../UserPhotosMediaViewer/UserPhotosMediaViewer';
import { UserPostCreate } from '../UserPostCreate/UserPostCreate';
import { UserPosts } from '../UserPosts/UserPosts';
import './styles/style.scss'

interface IUserPageContentProps {
    user: User,
    avatar: Photo | null
}

const UserPageContent: React.FC<IUserPageContentProps> = ({user, avatar}) => {

    const [photoModalActive, setPhotoModalActive] = useState<boolean>(false);
    const { id: paramId } = useParams();
    const { id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const isOwner = Number(paramId) === authId;
    const fullName = convetToFullName(user.first_name, user.last_name, user.middle_name);
    const avatarUrl = avatar ? getImageUrl(avatar.image) : undefined;

    const handleAvatarClick = () => {
        setPhotoModalActive(true);
    }

    return (
        <div className='user-page-content'>
            <div className='user-page-info'>
                <div className='user-page-info-avatar' onClick={handleAvatarClick}>
                    <Avatar src={avatarUrl} size='l' />
                </div>
                <UserPageDetail
                    name={fullName}
                    about={user.description}
                />
            </div>
            <div className='user-page-content-box'>
                <div className='user-page-toolkit'>
                    <UserPageToolkit show={!isOwner}/>          
                </div>
                <div className='user-page-posts'>
                    <UserPostCreate show={isOwner}/>
                    <UserPosts id={user.id} isOwner={isOwner}/>
                </div>
            </div>
            <UserPhotosMediaViewer isOnwer={isOwner} active={photoModalActive} setActive={setPhotoModalActive}/>
        </div>
    );
};

export {UserPageContent};