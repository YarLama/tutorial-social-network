import React from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../../../app/api/userApi/types';
import { convetToFullName } from '../../../../app/helpers/common/text';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Avatar } from '../../../../components';
import { UserPageDetail } from '../UserPageDetail/UserPageDetail';
import { UserPageToolkit } from '../UserPageToolkit/UserPageToolkit';
import { UserPostCreate } from '../UserPostCreate/UserPostCreate';
import { UserPosts } from '../UserPosts/UserPosts';
import './styles/style.scss'

interface IUserPageContentProps {
    user: User
}

const UserPageContent: React.FC<IUserPageContentProps> = ({user}) => {

    const s = 'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'
    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
    const s2 = 'https://img1.akspic.ru/crops/8/3/8/6/6/166838/166838-battlefield_2042-battlefield_2042_obzor-kosti-electronic_arts-shuter-3840x2160.jpg';
    const s3 = 'https://w.forfun.com/fetch/85/85752d41628c834b3c0501156b38c877.jpeg?w=1470&r=0.5625';
    
    const { id: paramId } = useParams();
    const { id: authId} = useAppSelector(state => state.authReducer.authUserInfo)
    const isOwner = Number(paramId) === authId;
    const { isMobile } = useWindowSize();
    const fullName = convetToFullName(user.first_name, user.last_name, user.middle_name);
    console.log([paramId, authId, user])
    const kek = 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'

    return (
        <div className='user-page-content'>
            <div className='user-page-info'>
                <Avatar src={s1}/>
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