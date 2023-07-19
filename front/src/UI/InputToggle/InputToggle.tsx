import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './styles/style.scss';

interface IInputToggleProps {
    name: string;
    label?: string;
    isChecked?: boolean;
}

const InputToggle: React.FC<IInputToggleProps> = ({
    name,
    label,
    isChecked = false
}) => {

    const [inputToggle, setInputToggle] = useState<boolean>(isChecked);
    const {setFieldValue} = useFormikContext();
    const classNames = ['input-toggle-field']

    useEffect(() => {
        setFieldValue(name, inputToggle);
    }, [inputToggle])

    const handleChange = (e: React.ChangeEvent<any>) => {
        setInputToggle(e.target.checked)
    }

    return (
        <div className='input-toggle'>
            <label className="toggler-wrapper">
                <input type="checkbox" onChange={handleChange} checked={isChecked}/>
                <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                </div>
            </label>
            {label && <span className='toggle-label'>{label}</span>}
        </div>
    )
};

export { InputToggle };