import React, { Dispatch, SetStateAction, useState } from 'react';
import { Photo } from '../../../../app/api/photoApi/types';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { MediaViewer } from '../../../../components';

interface IUserPhotosMediaViewer {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    elements: Photo[];
    isOnwer: boolean;
}

const UserPhotosMediaViewer: React.FC<IUserPhotosMediaViewer> = ({isOnwer, active, setActive, elements}) => {

    const [currentPhoto, setCurrentPhoto] = useState<Photo>();

    const handleSetAvatarClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(`set photo as avatar with ${currentPhoto?.id} id` );
        console.log(currentPhoto)
    }

    const handleDeletePhotoClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(`delete photo with ${currentPhoto?.id} id` )
    }

    const ownerDropupItems : DropupItem[] = [
        {label: 'Set as avatar', onClick: (e) => handleSetAvatarClick(e)},
        {label: 'Delete photo', onClick: (e) => handleDeletePhotoClick(e)}
    ]

    const guestDropupItems : DropupItem[] = [
        {label: 'Share', onClick: () => console.log('SHARE CLICK')},
    ]

    const avatarSort = (array: Photo[]): Photo[] | null => {
        if (array.length === 0) return null;
        const sortedArrayById = [...array].sort((a, b) => a.id - b.id);
        const avatarIndex = sortedArrayById.findIndex(el => el.is_avatar === true);
        if (avatarIndex !== -1) {
            const avatarPhoto = sortedArrayById.splice(avatarIndex, 1)[0];
            sortedArrayById.unshift(avatarPhoto);
        }
        return sortedArrayById;
    }

    return (
        <>
            <MediaViewer 
                elements={avatarSort(elements)} 
                active={active} 
                setActive={setActive} 
                dropupItems={isOnwer ? ownerDropupItems : guestDropupItems}
                getCurrentMedia={setCurrentPhoto}
            />
        </>
    );
};

export {UserPhotosMediaViewer};