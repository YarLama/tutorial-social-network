import React from 'react';
import { IconButton } from '../IconButton/IconButton';
import './styles/style.scss';

interface IInputFileProps {
    name: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputFile: React.FC<IInputFileProps> = ({
    name,
    hasError = false,
    contentError,
    onChange,
    required,
}) => {

    const classNames = ['input-file-field']

    if (hasError) classNames.push('error-input');

    return (
        <div className='input-file'>
            <input 
                type="file"
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                accept="image/png, image/jpeg"
                onChange={onChange}
                required={required}
                multiple={false}
                hidden
            />
            <label htmlFor={name} className={classNames.join(' ')} >
                <IconButton icon='attach' />
            </label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
};

export { InputFile };