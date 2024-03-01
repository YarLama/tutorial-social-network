import React from 'react';
import { getImageUrl } from '../../../../app/helpers/http';
import { UserSearchModelType } from '../../../../app/helpers/types/models';
import { Avatar } from '../../../../components';
import { Button } from '../../../../UI';
import './styles/style.scss';

interface IContactUserProps {
    user: UserSearchModelType;
    description: string | null;
    isSaved?: boolean;
}

const ContactUser: React.FC<IContactUserProps> = ({user, isSaved = false, description}) => {

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
                <Button content='Message' size='s'/>
                {isSaved ? <Button content='Delete from contacts' size='s'/>
                : <Button content='Add to contacts' size='s'/>}
            </div>
        
        </div>
    );
};

export default ContactUser;