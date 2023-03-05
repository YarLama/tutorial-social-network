import React, { MouseEventHandler } from 'react';
import './styles/style.scss'

interface IButtonProps {
    content: string;
    size?: 's' | 'm' | 'l';
    type?: 'button' | 'reset' | 'submit'
    disabled?: boolean;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IButtonProps> = ({content, extraClassName, size = 'm', disabled = false, onClick, ...props}) => {

    const classNames = ['btn', `btn-${size}`];

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