import React from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from '../../../../app/api/photoApi/types';
import { User } from '../../../../app/api/userApi/types';
import { convetToFullName } from '../../../../app/helpers/common/text';
import { getImageUrl } from '../../../../app/helpers/http';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { Avatar } from '../../../../components';
import { UserPageDetail } from '../UserPageDetail/UserPageDetail';
import { UserPageToolkit } from '../UserPageToolkit/UserPageToolkit';
import { UserPostCreate } from '../UserPostCreate/UserPostCreate';
import { UserPosts } from '../UserPosts/UserPosts';
import './styles/style.scss'

interface IUserPageContentProps {
    user: User,
    avatar: Photo | null
}

const UserPageContent: React.FC<IUserPageContentProps> = ({user, avatar}) => {

    const { id: paramId } = useParams();
    const { id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const isOwner = Number(paramId) === authId;
    const fullName = convetToFullName(user.first_name, user.last_name, user.middle_name);
    const avatarUrl = avatar ? getImageUrl(avatar.image) : undefined;

    return (
        <div className='user-page-content'>
            <div className='user-page-info'>
                <Avatar src={avatarUrl} size='l'/>
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
        </div>
    );
};

export {UserPageContent};