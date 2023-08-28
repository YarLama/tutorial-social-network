import React, { useEffect, useState } from 'react';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { LoaderRing } from '../../../../UI';
import { SettingPageContent } from '../SettingPageContent/SettingPageContent';

const SettingPage = () => {

    const { id: userId } = getUserInfoFromLocalToken();
    const { data: avatarData, isLoading: avatarLoading, refetch: avatarRefetch } = useGetUserAvatarQuery(userId);
    const { data: userData, isLoading: userLoading, refetch: userRefetch } = useGetUserByIdQuery(userId);
    const isLoading = userLoading && avatarLoading
    const dispatch = useAppDispatch();
    const { user, avatar } = useAppSelector(state => state.userReducer)
    const [isAvatarDispatch, setIsAvatarDispatch] = useState<boolean>(false);

    useEffect(() => {
        if (!userLoading) userData ? dispatch(userSlice.actions.setUser(userData)) : null;
    },[userData])

    useEffect(() => {
        if (!avatarLoading) {
            dispatch(userSlice.actions.setAvatar(avatarData ?? null));
            setIsAvatarDispatch(true);   
        } else {
            setIsAvatarDispatch(false);
        }
    }, [avatarData])

    useEffect(() => {
        avatarRefetch();
    }, [avatar])

    useEffect(() => {
        userRefetch();
    }, [user])

    return (
        !isLoading ?
        <div className='setting-page'>
            {user && isAvatarDispatch ? <SettingPageContent user={user} avatar={avatar}/> : <LoaderRing />}
        </div>
        : <LoaderRing />
    );
};

export {SettingPage};