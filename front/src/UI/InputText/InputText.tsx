import React from 'react';
import './styles/style.scss';

interface IInputTextProps {
    name: string;
    value: string;
    label?: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputText: React.FC<IInputTextProps> = ({
    name,
    value,
    label,
    hasError = false,
    contentError,
    onChange,
    required,
}) => {

    const classNames = ['input-text-field']

    if (hasError) classNames.push('error-input');

    return (
        <div className='input-text'>
            <input 
                type="text"
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={onChange}
                required={required}
            />
            <label className='input-text-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputText };