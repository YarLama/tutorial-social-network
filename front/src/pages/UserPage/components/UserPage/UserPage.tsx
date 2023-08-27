import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { UserPageContent } from '../UserPageContent/UserPageContent';
import UserPageLoading from '../UserPageLoading/UserPageLoading';
import './styles/style.scss'

const UserPage = () => {

    const { id: paramId } = useParams();
    const { data: userData, isLoading: userDataLoading } = useGetUserByIdQuery(paramId);
    const { data: userAvatar, isLoading: userAvatarLoading } = useGetUserAvatarQuery(paramId);
    const isLoading = userDataLoading && userAvatarLoading;
    const dispatch = useAppDispatch();
    const { user, avatar} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (!userDataLoading) userData ? dispatch(userSlice.actions.setUser(userData)) : null;
    },[userData])

    useEffect(() => {
        if (!userAvatarLoading) dispatch(userSlice.actions.setAvatar(userAvatar ?? null));
    }, [userAvatar])

    return (
        <div className='user-page'>
            { !user ? <UserPageLoading /> : <UserPageContent user={user} avatar={avatar}/>}
        </div>   
    );
};

export {UserPage};