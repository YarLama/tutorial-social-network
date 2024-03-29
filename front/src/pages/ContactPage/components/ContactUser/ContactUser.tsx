import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateContactMutation, useDeleteContactMutation } from '../../../../app/api/contactApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { ContactWithUserInfoType, UserSearchModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { Avatar } from '../../../../components';
import { Button, IconButton } from '../../../../UI';
import { modalControllerEnum } from '../../helpers/types';
import './styles/style.scss';

interface IContactUserProps {
    user: UserSearchModelType;
    description: string | null;
    isSaved?: boolean;
    onContactUserInfoClick?: (contact: ContactWithUserInfoType, modalType: keyof typeof modalControllerEnum) => void;
    onSearchedUserInfoClick?: (user: UserSearchModelType, modalType: keyof typeof modalControllerEnum) => void;
}

const ContactUser: React.FC<IContactUserProps> = ({user, isSaved = false, description = null, onContactUserInfoClick, onSearchedUserInfoClick}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { contacts } = useAppSelector(state => state.contactReducer);
    const [ deleteContact ] = useDeleteContactMutation();
    const [ createContact ] = useCreateContactMutation();
    const { isMobile } = useWindowSize();
    const isBigDescription = description ? description.length > 47 : null;
    const maxSpliter: number = isMobile ? 20 : 43;
    const descriptionText = isBigDescription && description ? `${description.slice(0, maxSpliter)} ...` : description;
    const currentContact = contacts.find(contact => contact.user.id === user.id);

    const handleMessageClick = () => {
        navigate(replaceWithId(RoutePaths.MESSAGE_PAGE_WITH_ID, user.id))
    }

    const handleAvatarClick = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, user.id))
    }

    const handleDeleteClick = async () => {
        try {
            if (currentContact) {
                await deleteContact({id: currentContact.id}).unwrap();
                dispatch(contactSlice.actions.deleteContact(currentContact));
            }
        } catch (e) {
            console.log(e);
        }
    }   

    const handleDescriptionCLick = () => {
        if (onContactUserInfoClick && currentContact) {
            onContactUserInfoClick(currentContact, 'descriptionModal')
        }
    }

    const handleEditClick = () => {
        if (onContactUserInfoClick && currentContact) {
            onContactUserInfoClick(currentContact, 'updateFormModal')
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

    const handleUserInfoClick = () => {
        if (isSaved) {
            if (onContactUserInfoClick && currentContact) {
                onContactUserInfoClick(currentContact, 'updateFormModal')
            }
        } else {
            if (onSearchedUserInfoClick && user) {
                onSearchedUserInfoClick(user, 'searchUserModal')
            }
        }
    }

    if (!user) return null;

    return (
        <div className='contact-user'>
            <div className='contact-user-avatar' onClick={handleAvatarClick}>
                {user.photos.length ? 
                    <Avatar src={getImageUrl(user.photos[0].image)} size='m'/>
                    : <Avatar size='m'/>
                }
            </div>
            <div className='contact-user-info' onClick={isMobile ? handleUserInfoClick : undefined}>
                <div className='contact-user-name'>{`${user.first_name} ${user.last_name}`}</div>
                { 
                    isSaved ? 
                        <div className='contact-user-description'>
                            { 
                                !isMobile ? 
                                    <div className='description-tools'>
                                        <IconButton icon='edit' size='xs' onClick={handleEditClick}/>
                                        {isBigDescription && <IconButton icon={'about'} size='xs' onClick={handleDescriptionCLick}/>}
                                    </div>
                                    : null
                            }
                            {description ? descriptionText : 'No description'}
                        </div>
                        : null
                }
                
            </div>
            {
                !isMobile ? 
                    <div className='contact-user-toolkit'>
                        <Button content='Message' size='s' onClick={handleMessageClick}/>
                        {isSaved ? <Button content='Delete from contacts' size='s' onClick={handleDeleteClick}/>
                        : <Button content='Add to contacts' size='s' onClick={handleAddClick}/>}
                    </div>
                    : null
            }
        </div>
    );
};

export default ContactUser;