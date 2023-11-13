import { useFormikContext } from 'formik';
import React from 'react';
import { getImageUrl } from '../../app/helpers/http';
import { IconButton } from '../../UI';
import './styles/style.scss';

interface IImageUploadPreviewProps {
    image: File | string | null;
    inputFileName: string;
}

const ImageUploadPreview: React.FC<IImageUploadPreviewProps> = ({image, inputFileName}) => {

    const {setFieldValue} = useFormikContext();
    let url;

    const handleCancel = () => {
        setFieldValue(inputFileName, null)
    }

    if (!image) return null;
    if (image instanceof File) url = URL.createObjectURL(image);
    if (typeof image === 'string') url = getImageUrl(image);

    return (
        <div className='image-preview-box'>
            <img className='image-preview-content' src={url}/>
            <IconButton extraClassName='image-preview-cancel' icon='cancel' size='xs' onClick={handleCancel}/>
        </div>
    );
};

export {ImageUploadPreview};