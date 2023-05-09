import React from 'react';
import { LoginForm } from '../../../../modules/LoginForm';
import LoginCaption from '../LoginCaption/LoginCaption';
import LoginLink from '../LoginLink/LoginLink';
import './styles/style.scss'

const LoginPage = () => {
    return (
        <div className='login-page'>
            <LoginCaption />
            <LoginForm />
            <LoginLink />
        </div>
    );
};

export {LoginPage};