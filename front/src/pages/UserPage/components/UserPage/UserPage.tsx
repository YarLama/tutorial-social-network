import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllUsersQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { LoaderRing } from '../../../../UI';
import { UserPageContent } from '../UserPageContent/UserPageContent';
import UserPageLoading from '../UserPageLoading/UserPageLoading';
import './styles/style.scss'

const UserPage = () => {

    const { id: paramId } = useParams();
    const { id: authId} = useAppSelector(state => state.authReducer.user)
    
    const { data: userData, isLoading: isUserLoading} = useGetUserByIdQuery(paramId);
    const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery('');
    const isOwnUser = Number(paramId) === authId;
    const isLoading = isUserLoading && isUsersLoading;
    const { isMobile, windowSize } = useWindowSize();
    console.log([paramId, authId, isLoading, windowSize.width])

    return (
        <div className='user-page'>
            { isLoading ? <UserPageLoading /> : <UserPageContent />}
        </div>   
    );
};

export {UserPage};