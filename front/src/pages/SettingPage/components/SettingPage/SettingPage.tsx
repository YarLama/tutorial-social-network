import React, { useEffect, useState } from 'react';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { LoaderRing } from '../../../../UI';
import { SettingPageContent } from '../SettingPageContent/SettingPageContent';

const SettingPage = () => {

    const { id: userId } = getUserInfoFromLocalToken();
    const { refetch: avatarRefetch } = useGetUserAvatarQuery(userId);
    const { refetch: userRefetch } = useGetUserByIdQuery(userId);
    const dispatch = useAppDispatch();
    const { user, avatar } = useAppSelector(state => state.userReducer)
    const [isAvatarDispatch, setIsAvatarDispatch] = useState<boolean>(false);

    useEffect(() => {
        if (user === null) {
            userRefetch().then((responce) => {
                responce.data ? dispatch(userSlice.actions.setUser(responce.data)) : null;
            })
        }
        if (avatar === null) {
            avatarRefetch().then((responce => {
                dispatch(userSlice.actions.setAvatar(responce.data ?? null));
                setIsAvatarDispatch(true);
            }))
        }
    }, [])

    useEffect(() => {
        avatarRefetch().then((responce => {
            setIsAvatarDispatch(false);
            dispatch(userSlice.actions.setAvatar(responce.data ?? null));
            setIsAvatarDispatch(true);
        }))
    }, [avatar])

    useEffect(() => {
        if (user && user.id !== userId) {
            userRefetch().then((responce) => {
                responce.data ? dispatch(userSlice.actions.setUser(responce.data)) : null;
            })
        }
    }, [user])

    return (
        <div className='setting-page'>
            {user && user.id === userId && isAvatarDispatch ? <SettingPageContent user={user} avatar={avatar}/> : <LoaderRing />}
        </div>
    );
};

export {SettingPage};