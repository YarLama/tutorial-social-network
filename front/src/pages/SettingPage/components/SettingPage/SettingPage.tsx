import React, { useEffect } from 'react';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { LoaderRing } from '../../../../UI';
import { SettingPageContent } from '../SettingPageContent/SettingPageContent';

const SettingPage = () => {

    const { id: userId } = getUserInfoFromLocalToken();
    const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(userId);
    const { data: avatarData, isLoading: avatarLoading } = useGetUserAvatarQuery(userId);
    const isLoading = userLoading && avatarLoading
    const dispatch = useAppDispatch();
    const { user, avatar} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        userData ? dispatch(userSlice.actions.setUser(userData)) : null;
        avatarData ? dispatch(userSlice.actions.setAvatar(avatarData)) : null;
    },[userData, avatarData])

    return (
        !isLoading ?
        <div className='setting-page'>
            {user ? <SettingPageContent user={user} avatar={avatar}/> : <LoaderRing />}
        </div>
        : <LoaderRing />
    );
};

export {SettingPage};