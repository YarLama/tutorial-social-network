import React from 'react';
import './styles/style.scss'

interface IAvatarProps {
    src: string | undefined;
    small?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({
    src,
    small = false
}) => {

    const default_user = require('./assets/default_user.png')

    return (
        <div className={`avatar-box ${small ? 'small-avatar': ''}`}>
            { src 
                ? <img src={src} alt={`avatar`} className={'user-avatar'}/>
                : <img src={default_user} alt={`avatar`} className={'default-avatar'}/>
            }
        </div>
    );
};

export {Avatar};