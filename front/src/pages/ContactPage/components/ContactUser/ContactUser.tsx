import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateContactMutation, useDeleteContactMutation } from '../../../../app/api/contactApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { ContactWithUserInfoType, UserSearchModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { Avatar } from '../../../../components';
import { Button } from '../../../../UI';
import './styles/style.scss';

interface IContactUserProps {
    user: UserSearchModelType;
    description: string | null;
    isSaved?: boolean;
}

const ContactUser: React.FC<IContactUserProps> = ({user, isSaved = false, description}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { contacts } = useAppSelector(state => state.contactReducer);
    const [ deleteContact ] = useDeleteContactMutation();
    const [ createContact ] = useCreateContactMutation();

    const handleMessageClick = () => {
        navigate(replaceWithId(RoutePaths.MESSAGE_PAGE_WITH_ID, user.id))
    }

    const handleDeleteClick = async () => {
        try {
            const currentContact = contacts.find(contact => contact.user.id === user.id)
            if (currentContact) {
                await deleteContact(currentContact.id).unwrap();
                dispatch(contactSlice.actions.deleteContact(currentContact));
            }
        } catch (e) {
            console.log(e);
        }
    }   

    const handleAddClick = async () => {
        try {
            const authUser = getUserInfoFromLocalToken();

            if (authUser.id) {
                const contactInfo = {
                    userId: authUser.id,
                    targetUserId: user.id 
                }
                const createdContact = await createContact(contactInfo).unwrap();
                const contact: ContactWithUserInfoType = {
                    id: createdContact.id,
                    description: createdContact.description,
                    user: user
                } 
                dispatch(contactSlice.actions.addContact(contact))
            }   
        } catch (e) {
            console.log(e);
        }
    }

    if (!user) return null;

    return (
        <div className='contact-user'>
            {user.photos.length ? 
                <Avatar src={getImageUrl(user.photos[0].image)} size='m'/>
                : <Avatar size='m'/>
            }
            <div className='contact-user-info'>
                <div className='contact-user-name'>{`${user.first_name} ${user.last_name}`}</div>
                <div className='contact-user-description'>
                    {description ?? 'No description'}
                </div>
            </div>
            <div className='contact-user-toolkit'>
                <Button content='Message' size='s' onClick={handleMessageClick}/>
                {isSaved ? <Button content='Delete from contacts' size='s' onClick={handleDeleteClick}/>
                : <Button content='Add to contacts' size='s' onClick={handleAddClick}/>}
            </div>
        
        </div>
    );
};

export default ContactUser;