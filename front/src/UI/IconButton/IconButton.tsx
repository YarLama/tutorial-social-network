import React, { MouseEventHandler } from 'react';
import { icons } from './constants/IconList'
import './styles/style.scss';

type Icon = keyof typeof icons;

interface IIconButtonProps {
    size?: 'xs' | 's' | 'm' | 'l';
    icon: Icon;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const IconButton: React.FC<IIconButtonProps> = ({extraClassName, size = 'm', icon, onClick, ...props}) => {

    const classNames = ['btn-icon', `btn-icon-${size}`, icons[icon].class];

    if (extraClassName) classNames.push(extraClassName);

    return (
        <>
            <button className={classNames.join(' ')} onClick={onClick} {...props}>
                {icons[icon].src}  
            </button>
        </>
    );
};

export { IconButton, IIconButtonProps};