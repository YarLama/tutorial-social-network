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
    //onChange: (e: React.ChangeEvent<any>) => void;
}

const InputPhone: React.FC<IInputPhoneProps> = ({
    name,
    value,
    label,
    hasError = false,
    contentError,
    //onChange,
    required,
    readonly = false
}) => {

    const [inputNumber, setInputNumber] = useState<string>('');
    const {handleChange} = useFormikContext();
    const classNames = ['input-phone-field'];

    useEffect(() => {
        prepareDisplayPhoneNumber()
    }, [])

    useEffect(() => {
        console.log(['useEffect inputNumber', inputNumber])
    }, [inputNumber])

    const prepareDisplayPhoneNumber = (phone = value) => {
        if (phone.length === 0) return;
        if (phone.length === 11) phone = phone.substring(1);
        setInputNumber(phone);
    }

    const handlePhoneChange = (e: React.ChangeEvent<any>) => {
        console.log(e.target.value);
        handleChange(e);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const numberOnlyRegexp: RegExp = new RegExp(`[0-9]`);
        const accessKeys: string[] = ['Enter','Backspace'];
        if (!(numberOnlyRegexp.test(e.key) || accessKeys.includes(e.key))) {
            e.preventDefault();
            return;
        }
        if (e.key === 'Backspace') setInputNumber(inputNumber.slice(0, -1))
        if (inputNumber.length >= 10) return;

        
        if (numberOnlyRegexp.test(e.key)) {
            setInputNumber(inputNumber.concat(e.key))
            
        } 
        console.log(['keydown', e.key, inputNumber])
        return
    }

    const formatPhoneNumber = (phone: string) => {
        const length = phone.length;
        console.log(['formatPhoneNumber', phone, length])
        if (length === 0) return ('');
        if (length <= 3) return (`+7 (${phone}`);
        if (length <= 6) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3)}`);
        if (length <= 8) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`);
        if (length <= 10) return (`+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`);
        if (length === 11) phone = phone.substring(1);

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
                onKeyDown={handleKeyDown}
                required={required}
                readOnly={readonly}
            />
            <label className='input-phone-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputPhone };