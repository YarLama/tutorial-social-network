import React from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from '../../../../app/api/photoApi/types';
import { User } from '../../../../app/api/userApi/types';
import { convetToFullName } from '../../../../app/helpers/common/text';
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

    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
    
    const { id: paramId } = useParams();
    const { id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const isOwner = Number(paramId) === authId;
    const fullName = convetToFullName(user.first_name, user.last_name, user.middle_name);
    console.log([user, avatar])

    return (
        <div className='user-page-content'>
            <div className='user-page-info'>
                <Avatar src={avatar?.image}/>
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