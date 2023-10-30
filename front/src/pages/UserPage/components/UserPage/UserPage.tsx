import { AxiosError } from 'axios';
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
    const { data: userData, refetch: userRefetch, error: userError } = useGetUserByIdQuery(paramId);
    const { data: userAvatar, isLoading: avatarLoading,refetch: avatarRefetch, error  } = useGetUserAvatarQuery(paramId);
    const dispatch = useAppDispatch();
    const { user, avatar} = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (userData) dispatch(userSlice.actions.setUser(userData));
    }, [userData])

    useEffect(() => {
        if (!avatarLoading) dispatch(userSlice.actions.setAvatar(userAvatar ?? null));
    }, [userAvatar, avatarLoading])

    useEffect(() => {
        userRefetch();
        avatarRefetch();
    }, [paramId]);

    if (userError) return <div style={{'color': 'white', 'fontSize': '16pt'}}> User doesn't exist </div>

    return (
        <div className='user-page'>
            {!user || avatarLoading? <UserPageLoading /> : <UserPageContent user={user} avatar={avatar}/>}
        </div>   
    );
};

export {UserPage};