import React from 'react';
import { Photo } from '../../../../app/api/photoApi/types';
import { User } from '../../../../app/api/userApi/types';
import { UserModelType } from '../../../../app/helpers/types/models';
import { SettingForm } from '../../../../modules/SettingForm';

interface ISettingPageContentProps {
    user: User;
    avatar: Photo | null;
}

const SettingPageContent: React.FC<ISettingPageContentProps> = ({user, avatar}) => {

    const userInfo: UserModelType = {...user, avatar: avatar};

    return (
        <div className='setting-page-content'>
            <SettingForm userInfo={userInfo}/>
        </div>
    );
};

export {SettingPageContent};