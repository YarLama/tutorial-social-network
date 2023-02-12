import React, { MouseEventHandler } from 'react';
import './styles/style.scss'

interface IButtonProps {
    content: string;
    type?: 's' | 'm' | 'l';
    disabled?: boolean;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IButtonProps> = ({content, extraClassName, type = 'm', disabled = false, onClick, ...props}) => {

    const classNames = ['btn', `btn-${type}`];

    if (extraClassName) classNames.push(extraClassName);
    if (disabled) return null;
    return (
        <>
            <button className={classNames.join(' ')} onClick={onClick} {...props}>
                {content}
            </button>
        </>
    );
};

export { Button, IButtonProps};