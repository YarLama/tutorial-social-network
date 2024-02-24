import React, { useEffect } from 'react';
import { useGetUserContactsQuery } from '../../../../app/api/userApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { LoaderRing } from '../../../../UI';
import ContactUserList from '../ContactUserList/ContactUserList';

const ContactPage = () => {

    const dispatch = useAppDispatch();
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo)
    const {data: userContactsData} = useGetUserContactsQuery(authId);
    console.log(userContactsData)

    useEffect(() => {
        if (userContactsData) dispatch(contactSlice.actions.setContacts(userContactsData))
    }, [userContactsData])

    return (
        <div className='contact-page'>
            {/* Search Form Component*/}
            { userContactsData ? <ContactUserList /> : <LoaderRing />}
        </div>
    );
};

export {ContactPage};