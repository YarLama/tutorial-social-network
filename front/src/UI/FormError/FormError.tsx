import React from 'react';
import './styles/style.scss';

interface IFormError {
    content: string;
}

const FormError: React.FC<IFormError> = ({content}) => {
    return (
        <span className='form-error'>
            {content}
        </span>
    );
};

export {FormError};