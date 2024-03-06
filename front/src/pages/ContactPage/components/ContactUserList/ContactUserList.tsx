import React, { useEffect, useState } from 'react';
import { useGetUsersByNameQuery } from '../../../../app/api/userApi';
import { UserSearchModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import ContactUser from '../ContactUser/ContactUser';
import './styles/style.scss'

interface IContactUserListProps {
    search?: string;
}

const ContactUserList: React.FC<IContactUserListProps> = ({search = ''}) => {

    const [searchedUsers, setSearchedUsers] = useState<UserSearchModelType[]>([]);
    const { contacts } = useAppSelector(state => state.contactReducer)
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
        <div className='contact-user-list'>

            {contacts.length && contactsWithSearchName.length ? 
                <div className='contact-user-list-saved'>
                    <div className='contact-user-list-saved-label'>{`My contacts`}</div> 
                    {contactsWithSearchName.map(contact => <ContactUser 
                        key={contact.id}
                        user={contact.user}
                        description={contact.description}
                        isSaved
                    />)}
                </div>   
                : contacts.length ? null : <div className='contact-user-list-not-found'>{`You haven't contacts`}</div>
            }

            {searchedUsers.length ? 
                <div className='contact-user-list-found'>
                    <div className='contact-user-list-found-label'>{`Found ${searchedUsers.length} users`}</div> 
                    {searchedUsers.map(user => <ContactUser 
                        key={user.id}
                        user={user}
                        description={null}
                    />)}
                </div>   
                : contactsWithSearchName.length ? null : <div className='contact-user-list-not-found'>{`Not found users with '${search}' name`}</div>
            }

        </div>
    );
};

export default ContactUserList;