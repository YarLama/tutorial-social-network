import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../../../app/api/userApi';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { UserPageContent } from '../UserPageContent/UserPageContent';
import UserPageLoading from '../UserPageLoading/UserPageLoading';
import './styles/style.scss'

const UserPage = () => {

    const { id: paramId } = useParams();
    const { data: userData } = useGetUserByIdQuery(paramId);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        userData ? dispatch(userSlice.actions.setUser(userData)) : null;
    }, [userData])

    return (
        <div className='user-page'>
            { !userData ? <UserPageLoading /> : <UserPageContent user={userData}/>}
        </div>   
    );
};

export {UserPage};