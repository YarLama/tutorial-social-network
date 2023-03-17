import React from 'react';
import './styles/style.scss';

interface IInputSelectProps {
    name: string;
    label?: string;
    hasError?: boolean;
    contentError?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<any>) => void;
    values: SelectOptionType[];
    valueDefault: string;
}

type SelectOptionType = {
    value: string,
    label: string
}

const InputSelect: React.FC<IInputSelectProps> = ({
    name,
    label,
    hasError = false,
    contentError,
    onChange,
    required,
    values = [],
    valueDefault
}) => {

    const classNames = ['input-select-field']

    if (hasError) classNames.push('error-input');

    const hasValue = (value: string): boolean => {
        const valuesArray: string[] = []
        values.map(el => valuesArray.push(el.value))
        return valuesArray.includes(value);;
    }

    return (
        <div className='input-select'>
            <select
                className={classNames.join(' ')} 
                id={name} 
                name={name} 
                onChange={onChange}
                required={required}
                defaultValue={hasValue(valueDefault) ? valueDefault : ''}
            >
                <option disabled hidden value={''} label={label} ></option>
                {
                    values.map(element => <option value={element.value} key={element.value}>{element.label}</option>)
                }
                
            </select>
            <label className='input-select-label' htmlFor={name}>{label}</label>
            {contentError && hasError ? <span className='error-message'>{contentError}</span> : null}
        </div>
    );
};

export {InputSelect};