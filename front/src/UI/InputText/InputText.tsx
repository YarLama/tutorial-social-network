import React from 'react';
import './styles/style.scss';

interface IInputTextProps {
    name: string;
    value: string;
    label?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const InputText: React.FC<IInputTextProps> = ({
    name,
    value,
    label,
    onChange
}) => {

    return (
        <div className='input-text'>
            <input 
                type="text"
                className='input-text-field' 
                id={name} 
                name={name} 
                placeholder={label} 
                value={value}
                onChange={onChange}
            />
            <label className='input-text-label'>{label}</label>
        </div>
    )
};

export { InputText };