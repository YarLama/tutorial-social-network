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
    numberOnly?: boolean;
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
    numberOnly = false,
    readonly = false
}) => {

    const classNames = ['input-text-field']

    const handleNumberOnly = (e: React.KeyboardEvent) => {
        const reg: RegExp = /[0-9]/;
        const includeAccessKey: string[] = ['Backspace','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter']
        if (!reg.test(e.key) && !includeAccessKey.includes(e.key)) e.preventDefault();
    }

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
                onKeyDown={numberOnly ? handleNumberOnly : undefined}
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