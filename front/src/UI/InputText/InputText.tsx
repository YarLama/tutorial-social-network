import React from 'react';
import './styles/style.scss';

interface IInputTextProps {
    name: string;
    value: string;
    label?: string;
    type?: 'text' | 'password';
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    readonly?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputText: React.FC<IInputTextProps> = ({
    name,
    value,
    label,
    type = 'text',
    hasError = false,
    contentError,
    onChange,
    required,
    readonly = false
}) => {

    const classNames = ['input-text-field']

    if (hasError) classNames.push('error-input');

    return (
        <div className='input-text'>
            <input 
                type={type}
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readonly}
            />
            <label className='input-text-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputText };