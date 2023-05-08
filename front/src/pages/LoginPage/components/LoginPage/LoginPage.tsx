import React from 'react';
import { LoginForm } from '../../../../modules/LoginForm';
import './styles/style.scss'

const LoginPage = () => {
    return (
        <div className='login-page'>
            <LoginForm />
            <p>Don’t have an account? Create one</p>
        </div>
    );
};

export {LoginPage};