import React from 'react';
import { RegistrationForm } from '../../../../modules/RegistrationForm';
import RegistrationCaption from '../RegistrationCaption/RegistrationCaption';
import RegistrationLink from '../RegistrationLink/RegistrationLink';
import './styles/style.scss'

const RegistrationPage = () => {
    return (
        <div className='registration-page'>
            <RegistrationCaption />
            <RegistrationForm />
            <RegistrationLink />
        </div>
    );
};

export {RegistrationPage};