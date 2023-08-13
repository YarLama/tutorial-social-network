import React from 'react';
import { getImageUrl } from '../../app/helpers/http';
import './styles/style.scss'

interface IAvatarProps {
    src?: string;
    size: 's' | 'm' | 'l';
}

const Avatar: React.FC<IAvatarProps> = ({
    src,
    size = 'l'
}) => {

    const default_user = require('./assets/default_user.png');
    const className = ['avatar-box', `${size}-size-box`];

    return (
        <div className={className.join(' ')}>
            { src 
                ? <img src={src} alt={`avatar`} className={'user-avatar'}/>
                : <img src={default_user} alt={`avatar`} className={'default-avatar'}/>
            }
        </div>
    );
};

export {Avatar};