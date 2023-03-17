import React from 'react';
import './styles/style.scss';

interface IInputTextareaProps {
    name: string;
    value: string;
    label?: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputTextarea: React.FC<IInputTextareaProps> = ({
    name,
    value,
    label,
    hasError = false,
    contentError,
    onChange,
    required,
}) => {

    const classNames = ['input-textarea-field']

    if (hasError) classNames.push('error-input');

    return (
        <div className='input-textarea'>
            <textarea 
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={onChange}
                required={required}
            />
            <label className='input-textarea-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
};

export {InputTextarea};