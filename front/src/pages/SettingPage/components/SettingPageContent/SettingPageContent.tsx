import React from 'react';
import { Photo } from '../../../../app/api/photoApi/types';
import { User } from '../../../../app/api/userApi/types';
import { UserModelType } from '../../../../app/helpers/types/models';

interface ISettingPageContentProps {
    user: User;
    avatar: Photo | null;
}

const SettingPageContent: React.FC<ISettingPageContentProps> = ({user, avatar}) => {

    const userInfo: UserModelType = {...user, avatar: avatar};
    console.log(userInfo);

    return (
        <div className='setting-page-content'>
            {user.id} {user.first_name} {user.last_name} {user.middle_name} {user.description}
        </div>
    );
};

export {SettingPageContent};