import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import './styles/style.scss'

const LoginLink: React.FC = () => {
    return (
        <div className='login-link'>
            <p>Don’t have an account? <Link to={RoutePaths.REGISTRATION_PAGE}>Create one</Link></p>
        </div>
    );
};

export default LoginLink;