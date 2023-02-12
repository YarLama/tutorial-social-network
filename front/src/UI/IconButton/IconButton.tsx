import React, { MouseEventHandler } from 'react';
import { icons } from './constants/IconList'
import './styles/style.scss';

type Icon = keyof typeof icons;

interface IIconButtonProps {
    type?: 's' | 'm';
    icon: Icon;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const IconButton: React.FC<IIconButtonProps> = ({extraClassName, type = 'm', icon, onClick, ...props}) => {

    const classNames = ['btn-icon', `btn-icon-${type}`, icons[icon].class];

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