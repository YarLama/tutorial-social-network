import React from 'react';
import { IconButton } from '../../UI';
import './styles/style.scss';

interface IImageUploadPreviewProps {
    image: File | null;
    onCancelClick: () => void;
}

const ImageUploadPreview: React.FC<IImageUploadPreviewProps> = ({image, onCancelClick}) => {

    if (!image) return null;

    const url = URL.createObjectURL(image);

    return (
        <div className='image-preview-box'>
            <img className='image-preview-content' src={url}/>
            <IconButton extraClassName='image-preview-cancel' icon='cancel' size='xs' onClick={onCancelClick}/>
        </div>
    );
};

export {ImageUploadPreview};