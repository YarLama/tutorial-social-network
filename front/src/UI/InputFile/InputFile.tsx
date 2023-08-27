import axios from 'axios';
import { useFormikContext } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import { getImageUrl } from '../../app/helpers/http';
import { IconButton } from '../IconButton/IconButton';
import './styles/style.scss';

interface IInputFileProps {
    name: string;
    contentError?: string;
    value: File | string | undefined | null;
    content?: string;
    required?: boolean;
}

const InputFile: React.FC<IInputFileProps> = memo(({
    name,
    contentError,
    required,
    content,
    value
}) => {

    const [inputFile, setInputFile] = useState<File>(value as File);
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-file-field'];

    useEffect(() => {
        prepareDisplayImagePreview()
    }, [])

    useEffect(() => {
        setFieldValue(name, inputFile);
    }, [inputFile])

    const getImageFileFromUrl = async (url: string) => {
        axios.get(url, {
            responseType: "blob"
        }).then(responce => {
            let name = url.split('/').slice(-1)
            let file = new File([responce.data], `${name}`, {type: 'image/jpeg'})
            setInputFile(file)
        }).catch(err => console.log(err))
    }

    const prepareDisplayImagePreview = async (image = value) => {
        if (image) {
            if (image instanceof File) {
                setInputFile(image);
                return;
            } else image?.toString().split('/').length > 1 ? getImageFileFromUrl(image) : getImageFileFromUrl(getImageUrl(image) ?? '');
        }
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const {files} = e.target;
        if (files.length > 0) setInputFile(files[0]);
    }

    if (contentError) classNames.push('error-input');

    return (
        <div className='input-file'>
            <input 
                type="file"
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                accept="image/png, image/jpeg"
                onChange={handleChange}
                required={required}
                multiple={false}
                hidden
            />
            <label htmlFor={name} className={classNames.join(' ')} >
                {content ? content : <IconButton icon='attach' />}
            </label>
            {contentError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
});

export { InputFile };