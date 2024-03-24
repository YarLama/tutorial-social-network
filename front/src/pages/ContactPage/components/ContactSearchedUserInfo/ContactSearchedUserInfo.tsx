import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateContactMutation } from '../../../../app/api/contactApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { convertToFullName } from '../../../../app/helpers/common/text';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { ContactWithUserInfoType, UserSearchModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { contactSlice } from '../../../../app/store/reducers/ContactSlice';
import { Avatar } from '../../../../components';
import { Button } from '../../../../UI';

interface IContactSearchedUserInfoProps {
    user?: UserSearchModelType;
    setModalActive?: Dispatch<SetStateAction<boolean>>;
}

const ContactSearchedUserInfo: React.FC<IContactSearchedUserInfoProps> = ({user, setModalActive}) => {
    
    if (!user) return null;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ createContact ] = useCreateContactMutation();

    const handleMessageClick = () => {
        navigate(replaceWithId(RoutePaths.MESSAGE_PAGE_WITH_ID, user.id))
    }

    const handleAvatarClick = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, user.id))
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
                if (setModalActive) setModalActive(false);
            }   
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className='contact-searched-user-info-block'>
            <div onClick={handleAvatarClick} className='avatar-box'>
                <Avatar 
                    src={user.photos.length ? getImageUrl(user.photos[0].image) : undefined}
                    size='m'
                />
            </div>
            <div className='name-box'>
                {convertToFullName(user.first_name, user.last_name, user.middle_name)}
            </div>
            <div className='tooltip'>
                <Button 
                    content='Message'
                    size='s'
                    onClick={handleMessageClick}
                />
                <Button 
                    content='Add to Contacts'
                    size='s'
                    onClick={handleAddClick}
                />      
            </div>
        </div>
    );
};

export {ContactSearchedUserInfo};