import axios from 'axios';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { IconButton } from '../IconButton/IconButton';
import './styles/style.scss';

interface IInputFileProps {
    name: string;
    contentError?: string;
    value: File | string | undefined;
    content?: string;
    required?: boolean;
}

const InputFile: React.FC<IInputFileProps> = ({
    name,
    contentError,
    required,
    content,
    value
}) => {

    const [inputFile, setInputFile] = useState<File>(value as File);
    const {setFieldValue, getFieldProps} = useFormikContext();
    const classNames = ['input-file-field'];

    useEffect(() => {
        console.log('FROM INPUT FILE USE EFFECT', inputFile, value)
        prepareDisplayImagePreview()
        console.log('FROM INPUT FILE USE EFFECT', inputFile, value)
    }, [])

    useEffect(() => {
        setFieldValue(name, inputFile);
        console.log('FILE CHANGED', getFieldProps(name))
    }, [inputFile])

    const prepareDisplayImagePreview = async (image = value) => {
        if (image) {
            image instanceof File ? setInputFile(image)
            : axios.get(image, {responseType: "blob"}).then(responce => {
                let file = new File([responce.data], 'image.jpg', {type: 'image/jpeg'})
                setInputFile(file)
            }).catch(err => console.log(err));
        }
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const {files} = e.target;
        setInputFile(files[0]);
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
                //value={getFieldProps(name)}
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
};

export { InputFile };