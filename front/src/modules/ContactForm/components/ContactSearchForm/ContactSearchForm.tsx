import React from 'react';
import { InputTextWithTimeout } from '../../../../UI';
import './styles/style.scss'

interface IContactSearchFormProps {
    delay?: number,
    searchDispatch: (value: string) => void,
}

const ContactSearchForm: React.FC<IContactSearchFormProps> = ({delay = 2000,searchDispatch}) => {

    const handleChange = (value: string) => {
        searchDispatch(value);
    }

    return (
        <div className='contact-search-form'>
            <InputTextWithTimeout name='text' value='' label='Search' callback={handleChange} delay={1000}/>
        </div>
    );
};

export {ContactSearchForm};