import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { useGetUsersByNameQuery } from '../../../../app/api/userApi';
import { ContactWithUserInfoType, UserSearchModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { ModalWindow } from '../../../../components';
import { ContactDescriptionUpdateForm } from '../../../../modules/ContactForm';
import { modalControllerEnum } from '../../helpers/types';
import { ContactSearchedUserInfo } from '../ContactSearchedUserInfo/ContactSearchedUserInfo';
import ContactUser from '../ContactUser/ContactUser';
import './styles/style.scss'

interface IContactUserListProps {
    search?: string;
}

const ContactUserList: React.FC<IContactUserListProps> = ({search = ''}) => {

    const [searchedUsers, setSearchedUsers] = useState<UserSearchModelType[]>([]);
    const [selectedContactUser, setSelectedContactUser] = useState<ContactWithUserInfoType>();
    const [selecterSearchedUser, setSelecterSearchedUser] = useState<UserSearchModelType>();
    const [contactUserModalActive, setContactUserModalActive] = useState<boolean>(false);
    const [modalType, setModalType] = useState<keyof typeof modalControllerEnum>('descriptionModal')
    const { contacts } = useAppSelector(state => state.contactReducer)

    const modalController: {[key in keyof typeof modalControllerEnum]: React.ComponentType | JSX.Element | ReactNode} = {
        descriptionModal: <div>{selectedContactUser?.description}</div>,
        updateFormModal: <ContactDescriptionUpdateForm contactId={selectedContactUser ? selectedContactUser.id : 0} />,
        searchUserModal: <ContactSearchedUserInfo user={selecterSearchedUser} setModalActive={setContactUserModalActive}/>
    }
    const contactsWithSearchName = search ? contacts.filter(contact => {
        const firstName = contact.user.first_name.charAt(0).toUpperCase() + contact.user.first_name.slice(1).toLowerCase();
        const lastName = contact.user.last_name.charAt(0).toUpperCase() + contact.user.last_name.slice(1).toLowerCase();
        const searchedName = search.length > 1 ? 
            search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()
        : search.charAt(0).toUpperCase() 
        if((firstName.includes(searchedName)) || (lastName.includes(searchedName))) return true;
        return false;
    }) : contacts;

    const {data, refetch} = useGetUsersByNameQuery(search, {
        skip: !search
    })

    const handleContactInfoClick = (contact: ContactWithUserInfoType, modalType: keyof typeof modalControllerEnum) => {
        setSelectedContactUser(contact);
        setModalType(modalType);
        setContactUserModalActive(true);
    }

    const handleSearchUserInfoClick = (user: UserSearchModelType, modalType: keyof typeof modalControllerEnum) => {
        setSelecterSearchedUser(user);
        setModalType(modalType);
        setContactUserModalActive(true);
    }

    useEffect(() => {
        setSearchedUsers([])
        if (search) refetch();
    }, [search])

    useEffect(() => {
        if (data) {
            const userInContacts = contacts.reduce((arr: number[], elem) => {
                if (!arr.includes(elem.user.id)) arr.push(elem.user.id)
                return arr
            }, [])
            
            const withoutSavedUsers = data.filter(user => !userInContacts.includes(user.id))
            if (withoutSavedUsers.length) setSearchedUsers(withoutSavedUsers)
        }
    }, [data])

    useEffect(() => {
        if (searchedUsers.length) {
            const userInContacts = contacts.reduce((arr: number[], elem) => {
                if (!arr.includes(elem.user.id)) arr.push(elem.user.id)
                return arr
            }, []);
            const withoutSavedUsers = searchedUsers.filter(user => !userInContacts.includes(user.id))
            setSearchedUsers(withoutSavedUsers);
        }
    }, [contacts])

    return (
        <>
            <div className='contact-user-list'>

            {contacts.length && contactsWithSearchName.length ? 
                <div className='contact-user-list-saved'>
                    <div className='contact-user-list-saved-label'>{`My contacts`}</div> 
                    {contactsWithSearchName.map(contact => <ContactUser 
                        key={contact.id}
                        user={contact.user}
                        description={contact.description}
                        isSaved
                        onContactUserInfoClick={handleContactInfoClick}
                    />)}
                </div>   
                : contacts.length ? null : <div className='contact-user-list-not-found'>{`You haven't contacts`}</div>
            }

            {search === '' ? null : searchedUsers.length ? 
                <div className='contact-user-list-found'>
                    <div className='contact-user-list-found-label'>{`Found ${searchedUsers.length} users`}</div> 
                    {searchedUsers.map(user => <ContactUser 
                        key={user.id}
                        user={user}
                        description={null}
                        onSearchedUserInfoClick={handleSearchUserInfoClick}
                    />)}
                </div>   
                : contactsWithSearchName.length ? null : <div className='contact-user-list-not-found'>{`Not found users with '${search}' name`}</div>
            }

            </div>
            {(selectedContactUser || selecterSearchedUser) && <ModalWindow active={contactUserModalActive} setActive={setContactUserModalActive} controls={false}>
                {modalController[modalType] as ReactNode}
            </ModalWindow>}
            
        </>
    );
};

export default ContactUserList;