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
    
    const { data: userData } = useGetUserByIdQuery(paramId);
    const { isMobile, windowSize } = useWindowSize();

    return (
        <div className='user-page'>
            { !userData ? <UserPageLoading /> : <UserPageContent user={userData}/>}
        </div>   
    );
};

export {UserPage};