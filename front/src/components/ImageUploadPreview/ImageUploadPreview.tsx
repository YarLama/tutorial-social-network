import { useFormikContext } from 'formik';
import React from 'react';
import { IconButton } from '../../UI';
import './styles/style.scss';

interface IImageUploadPreviewProps {
    image: File | null;
    inputFileName: string;
}

const ImageUploadPreview: React.FC<IImageUploadPreviewProps> = ({image, inputFileName}) => {

    const {setFieldValue} = useFormikContext();

    const handleCancel = () => {
        setFieldValue(inputFileName, null)
    }

    if (!image) return null;

    const url = URL.createObjectURL(image);

    return (
        <div className='image-preview-box'>
            <img className='image-preview-content' src={url}/>
            <IconButton extraClassName='image-preview-cancel' icon='cancel' size='xs' onClick={handleCancel}/>
        </div>
    );
};

export {ImageUploadPreview};