import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import './styles/style.scss'

const RegistrationLink: React.FC = () => {
    return (
        <div className='registration-link'>
            <p>You have an account? <Link to={RoutePaths.LOGIN_PAGE}>Sign in</Link></p>
        </div>
    );
};

export default RegistrationLink;