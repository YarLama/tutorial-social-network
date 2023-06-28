import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputTextareaProps {
    name: string;
    value: string;
    label?: string;
    contentError?: string;
    required?: boolean;
}

const InputTextarea: React.FC<IInputTextareaProps> = ({
    name,
    value,
    label,
    contentError,
    required,
}) => {

    const [inputText, setInputText] = useState<string>('');
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-textarea-field']

    // useEffect(() => {
    //     prepareDisplayText();
    // }, [])

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
        <div className='input-textarea'>
            <textarea 
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={handleChange}
                required={required}
            />
            <label className='input-textarea-label' htmlFor={name}>{label}</label>
            {contentError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
};

export {InputTextarea};