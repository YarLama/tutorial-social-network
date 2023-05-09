import React, { ChangeEvent, useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputPhoneProps {
    name: string;
    value: string;
    label?: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    readonly?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputPhone: React.FC<IInputPhoneProps> = ({
    name,
    value,
    label,
    hasError = false,
    contentError,
    onChange,
    required,
    readonly = false
}) => {

    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const classNames = ['input-phone-field'];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const reg: RegExp = /[0-9]/;
        const includeAccessKey: string[] = ['Backspace','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter']
        if (!reg.test(e.key) && !includeAccessKey.includes(e.key)) e.preventDefault();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Убрать все нецифровые символы
        const length = value.length;
        
        if (length === 0) {
          setPhoneNumber('');
          return;
        }
    
        if (length <= 3) {
          setPhoneNumber(`+7 (${value}`);
          return;
        }
    
        if (length <= 6) {
          setPhoneNumber(`+7 (${value.slice(0, 3)}) ${value.slice(3)}`);
          return;
        }
    
        if (length <= 8) {
          setPhoneNumber(`+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`);
          return;
        }
    
        if (length <= 10) {
          setPhoneNumber(`+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8)}`);
          return;
        }
    
        setPhoneNumber(`+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`);
      };

    const formatPhoneNumber = (phoneNumber: string) => {
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
          return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
        }
        if (phoneNumberLength < 9) {
          return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
        }
        return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
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
                value={phoneNumber}
                onChange={handleChange}
                //onKeyDown={handleKeyDown}
                required={required}
                readOnly={readonly}
            />
            <label className='input-phone-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    )
};

export { InputPhone };