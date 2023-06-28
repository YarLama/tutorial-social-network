import React from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Avatar } from '../../../../components';
import { PostForm } from '../../../../modules/PostForm';
import { Button } from '../../../../UI';
import { UserPageDetail } from '../UserPageDetail/UserPageDetail';
import './styles/style.scss'

const UserPageContent: React.FC = () => {

    const k = undefined;
    const n = null;
    const s = 'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'
    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
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
            <div className='user-page-toolkit'>
                {!isOwner
                    ?
                        <div className='toolkit-non-owner'>
                            <Button content='Send Message' size={isMobile ? 'm' : 's'}/>
                            <Button content='Add to Contact' size={isMobile ? 'm' : 's'}/>
                        </div>
                    : 
                        <div className='toolkit-owner'>
                            {isMobile 
                                ? <Button content='Create Post' size={isMobile ? 'm' : 's'}/>
                                : <PostForm />
                            }
                        </div>
                }
                
                
            </div>
            
            {/* <Avatar src={s} small/> */}
        </div>
    );
};

export {UserPageContent};