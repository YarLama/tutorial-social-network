import React, { useEffect, useState } from 'react';
import { useGetUserContactsQuery } from '../../../../app/api/userApi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { ContactSearchForm } from '../../../../modules/ContactForm';
import { LoaderRing } from '../../../../UI';
import ContactUserList from '../ContactUserList/ContactUserList';

const ContactPage = () => {

    const [searchName, setSearchName] = useState<string>('')
    const dispatch = useAppDispatch();
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo)
    const {data: userContactsData} = useGetUserContactsQuery(authId);

    useEffect(() => {
        if (userContactsData) dispatch(contactSlice.actions.setContacts(userContactsData))
    }, [userContactsData])

    return (
        <div className='contact-page'>
            <ContactSearchForm searchDispatch={setSearchName}/>
            { userContactsData ? <ContactUserList search={searchName}/> : <LoaderRing />}
        </div>
    );
};

export {ContactPage};