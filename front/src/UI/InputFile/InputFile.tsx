import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { IconButton } from '../IconButton/IconButton';
import './styles/style.scss';

interface IInputFileProps {
    name: string;
    contentError?: string;
    content?: string;
    required?: boolean;
}

const InputFile: React.FC<IInputFileProps> = ({
    name,
    contentError,
    required,
    content
}) => {

    const [inputFile, setInputFile] = useState<File>();
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-file-field'];

    useEffect(() => {
        setFieldValue(name, inputFile)
    }, [inputFile])

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