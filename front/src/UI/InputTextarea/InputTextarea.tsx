import { useFormikContext } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputTextareaProps {
    name: string;
    value: string;
    label?: string;
    contentError?: string;
    required?: boolean;
    extraClassName?: string;
    maxLength?: number;
}

const InputTextarea: React.FC<IInputTextareaProps> = memo(({
    name,
    value,
    label,
    contentError,
    required,
    extraClassName,
    maxLength
}) => {

    const [inputText, setInputText] = useState<string>('');
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-textarea']

    if (extraClassName) classNames.push(extraClassName);

    useEffect(() => {
        prepareDisplayText();
    }, [])

    useEffect(() => {
        setFieldValue(name, inputText);
    }, [inputText])

    const prepareDisplayText = (text = value) => {
        if (text.length) setInputText(text);
        return;
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        const {value} = e.target;
        setInputText(value)
    }

    if (contentError) classNames.push('error-input');

    return (
        <div className={classNames.join(' ')}>
            <textarea 
                className='input-textarea-field' 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={handleChange}
                required={required}
                maxLength={maxLength}
            />
            <label className='input-textarea-label' htmlFor={name}>{label}</label>
            {contentError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
});

export {InputTextarea};