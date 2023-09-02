import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeletePhotoMutation, useSetAvatarStateMutation } from '../../../../app/api/photoApi';
import { Photo } from '../../../../app/api/photoApi/types';
import { useGetUserPhotosQuery } from '../../../../app/api/userApi';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { userSlice } from '../../../../app/store/reducers/UserSlice';
import { MediaViewer } from '../../../../components';

interface IUserPhotosMediaViewer {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    isOnwer: boolean;
}

const UserPhotosMediaViewer: React.FC<IUserPhotosMediaViewer> = ({isOnwer, active, setActive}) => {

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<Photo>();
    const { id: paramId } = useParams();
    const dispatch = useAppDispatch();
    const { refetch: photosRefetch } = useGetUserPhotosQuery(paramId);
    const [ deletePhoto ] = useDeletePhotoMutation();
    const [ setAvatarState ] = useSetAvatarStateMutation();

    const handleSetAvatarClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            if (currentPhoto?.is_avatar) {
                setActive(false);
                return;
            }
            await setAvatarState(currentPhoto?.id).unwrap();
            dispatch(userSlice.actions.setAvatar(currentPhoto ?? null)); 
            setActive(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDeletePhotoClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            await deletePhoto(currentPhoto?.id).unwrap();
            if (currentPhoto?.is_avatar) dispatch(userSlice.actions.setAvatar(null)); 
            setActive(false);
        } catch (e) {
            console.log(e);
        }
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

    useEffect(() => {
        if (!active) return;
        photosRefetch().then((responce) => {
            responce.data ? setPhotos(responce.data) : null;
        })
    }, [active])

    return (
        photos.length > 0 ?
        <>
            <MediaViewer 
                elements={avatarSort(photos)} 
                active={active} 
                setActive={setActive} 
                dropupItems={isOnwer ? ownerDropupItems : guestDropupItems}
                getCurrentMedia={setCurrentPhoto}
            />
        </> : null
    );
};

export {UserPhotosMediaViewer};