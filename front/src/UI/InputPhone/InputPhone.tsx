import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputPhoneProps {
    name: string;
    value: string;
    label?: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    readonly?: boolean;
}

const InputPhone: React.FC<IInputPhoneProps> = ({
    name,
    value,
    label,
    hasError = false,
    contentError,
    required,
    readonly = false
}) => {

    const [inputNumber, setInputNumber] = useState<string>('');
    const [phoneN, setPhoneN] = useState<string>('');
    const { values, handleChange, setFieldValue } = useFormikContext();
    const classNames = ['input-phone-field'];

    useEffect(() => {
        prepareDisplayPhoneNumber()
    }, [])

    useEffect(() => {
        setFieldValue(name, formatPhoneNumber(inputNumber))
    }, [inputNumber])

    const prepareDisplayPhoneNumber = (phone = value) => {
        if (phone.length === 0) return;
        if (phone.length === 11) phone = phone.substring(1);
        setInputNumber(phone);
    }

    const handlePhoneChange = (e: React.ChangeEvent<any>) => {
        const { value } = e.target;
        let phone = value.replace(/\D/g, '');
        if (phone.length >= 12 ) return;
        setInputNumber(phone)
    }

    const formatPhoneNumber = (phoneNumber: string) => {
        let phone = phoneNumber.replace(/\D/g, '');
        phone = (inputNumber.length >= 1 && phone[0] === '7') ? phone.substring(1) : phone;
        if (phone.length === 0) return ('');
        if (phone.length <= 3) return (`+7 (${phone}`);
        if (phone.length <= 6) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3)}`);
        if (phone.length <= 8) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`);
        if (phone.length <= 10) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`);
        if (phone.length === 11) phone = phone.substring(1);

        return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`);
        
    };

    if (hasError) classNames.push('error-input');

    return (
        <div className='input-phone'>
            <input 
                type={'tel'}
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                placeholder={label} 
                value={formatPhoneNumber(inputNumber)}
                onChange={handlePhoneChange}
                maxLength={18}
                required={required}
                readOnly={readonly}
            />
            <label className='input-phone-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputPhone };