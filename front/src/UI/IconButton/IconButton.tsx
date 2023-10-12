import React, { MouseEventHandler, useState } from 'react';
import { icons } from './constants/IconList'
import './styles/style.scss';

type Icon = keyof typeof icons;

interface IIconButtonProps {
    size?: 'xs' | 's' | 'm' | 'l';
    icon: Icon;
    extraClassName?: string;
    text?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean;
}

const IconButton: React.FC<IIconButtonProps> = ({extraClassName, size = 'm', icon, onClick, text = '', isActive = false, ...props}) => {

    const classNames = ['btn-icon', `btn-icon-${size}`, icons[icon].class];

    if (isActive) classNames.push('active-btn-icon');
    if (extraClassName) classNames.push(extraClassName);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick ? onClick(e) : null;
    }

    return (
        <>
            <span className={classNames.join(' ')} onClick={handleClick} {...props}>
                {icons[icon].src}  
            </span>
            {!!text ? text : null}
        </>
    );
};

export { IconButton, IIconButtonProps};