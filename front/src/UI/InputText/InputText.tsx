import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputTextProps {
    name: string;
    value: string;
    label?: string;
    type?: 'text' | 'password';
    contentError?: string;
    required?: boolean;
    readonly?: boolean;
    numberOnly?: boolean;
}

const InputText: React.FC<IInputTextProps> = ({
    name,
    value,
    label,
    type = 'text',
    contentError,
    required,
    numberOnly = false,
    readonly = false
}) => {

    const [inputText, setInputText] = useState<string>('');
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-text-field']

    useEffect(() => {
        prepareDisplayText();
    }, [])

    useEffect(() => {
        setFieldValue(name, inputText);
    }, [inputText])

    const prepareDisplayText = (text = value) => {
        text = numberOnly ? text.replace(/\D/g, '') : text;
        if (text.length) setInputText(text);
        return;
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const {value} = e.target;
        const text = numberOnly ? value.replace(/\D/g, '') : value;
        setInputText(text)
    }

    if (contentError) classNames.push('error-input');

    return (
        <div className='input-text'>
            <input 
                type={type}
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={inputText}
                onChange={handleChange}
                required={required}
                readOnly={readonly}
            />
            <label className='input-text-label' htmlFor={name}>{label}</label>
            {contentError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputText };