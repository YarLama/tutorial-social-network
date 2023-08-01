import React from 'react';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { LoaderRing } from '../../../../UI';
import { SettingPageContent } from '../SettingPageContent/SettingPageContent';

const SettingPage = () => {

    const { id: userId } = getUserInfoFromLocalToken();
    const { data: userData } = useGetUserByIdQuery(userId);
    const { data: avatarData } = useGetUserAvatarQuery(userId);

    return (
        <div className='setting-page'>
            {userData ? <SettingPageContent user={userData} avatar={avatarData ?? null}/> : <LoaderRing />}
        </div>
    );
};

export {SettingPage};