import { useFormikContext } from 'formik';
import React, { ChangeEventHandler, memo, MutableRefObject, useEffect, useState } from 'react';
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

interface IInputTextWithTimeoutProps extends IInputTextProps {
    callback?: (value: string) => void;
    delay?: number;
}

const InputText: React.FC<IInputTextProps> = memo(({
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
});

const InputTextWithTimeout: React.FC<IInputTextWithTimeoutProps> = memo(({
    name,
    value,
    label,
    type = 'text',
    required,
    readonly = false,
    callback,
    delay = 2000
}) => {

    const [fieldValue, setFieldValue] = useState('');
    const classNames = ['input-text-field']

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => callback ? callback(fieldValue) : null, delay)
        return () => clearTimeout(timeout)
    }, [fieldValue])

    return (
        <div className='input-text'>
            <input 
                type={type}
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={fieldValue}
                onChange={handleChange}
                required={required}
                readOnly={readonly}
            />
            <label className='input-text-label' htmlFor={name}>{label}</label>
        </div>
    )
})

export { InputText, InputTextWithTimeout };