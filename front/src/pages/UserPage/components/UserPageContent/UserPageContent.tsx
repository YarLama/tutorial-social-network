import React from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Avatar, Post } from '../../../../components';
import { Button } from '../../../../UI';
import { UserPageDetail } from '../UserPageDetail/UserPageDetail';
import { UserPageToolkit } from '../UserPageToolkit/UserPageToolkit';
import { UserPostCreate } from '../UserPostCreate/UserPostCreate';
import './styles/style.scss'

const UserPageContent: React.FC = () => {

    const s = 'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'
    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
    const s2 = 'https://img1.akspic.ru/crops/8/3/8/6/6/166838/166838-battlefield_2042-battlefield_2042_obzor-kosti-electronic_arts-shuter-3840x2160.jpg';
    const s3 = 'https://w.forfun.com/fetch/85/85752d41628c834b3c0501156b38c877.jpeg?w=1470&r=0.5625';
    const isOwner = true;
    const { isMobile } = useWindowSize();

    return (
        <div className='user-page-content'>
            <div className='user-page-info'>
                <Avatar src={s1}/>
                <UserPageDetail
                    name='Григо́рий Константи́нович Орджоники́дзе'
                    about='Описание моей жизни Описание моей жизниОписание моей жизниОписание моей жизниОписание моей жизниОписание моей жизниОписание моей жизниОписание моей жизни'
                />
            </div>
            <div className='user-page-content-box'>
                <div className='user-page-toolkit'>
                    <UserPageToolkit show={!isOwner}/>          
                </div>
                <div className='user-page-posts'>
                    <UserPostCreate show={isOwner}/>
                    <Post isOwnersPost={isOwner} contentText='Текст к посту' contentImage={{src:s, alt:'kek'}}/>
                    <Post isOwnersPost={isOwner} contentText='' contentImage={{src:s1, alt:'kek2'}}/>
                    <Post isOwnersPost={isOwner} contentText='' contentImage={{src:s2, alt:'kek2'}}/>
                    <Post isOwnersPost={isOwner} contentText='' contentImage={{src:s3, alt:'kek2'}}/>
                    <Post isOwnersPost={isOwner} contentText='Пытаеюсь фыв фыв фывфыыыыыы фыв фывф ывфыыЛЛАЛАаааа афывфывфывфывфы фывфывфыыыыыывфы вфывфывфывфыв' />
                </div>
            </div>
        </div>
    );
};

export {UserPageContent};