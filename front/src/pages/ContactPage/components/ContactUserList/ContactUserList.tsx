import React from 'react';
import { useAppSelector } from '../../../../app/hooks/redux/redux';

interface IContactUserListProps {
    searchedName?: string;
}

const ContactUserList: React.FC<IContactUserListProps> = ({}) => {
    
    const { contacts } = useAppSelector(state => state.contactReducer)

    console.log(contacts)
    return (
        <div className='contact-user-list'>
            {contacts.length ? 
                <div>{`${contacts.length} контактов найдено`}</div> 
                : <div>{`У вас еще нет контактов`}</div>
            }
        </div>
    );
};

export default ContactUserList;