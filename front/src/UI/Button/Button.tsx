import React, { MouseEventHandler } from 'react';
import './styles/style.scss'

interface IButtonProps {
    content: string;
    size?: 's' | 'm' | 'l';
    type?: 'button' | 'reset' | 'submit',
    hide?: boolean;
    disabled?: boolean;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IButtonProps> = ({content, extraClassName, size = 'm', hide = false, disabled = false, onClick, ...props}) => {

    const classNames = ['btn', `btn-${size}`];

    if (extraClassName) classNames.push(extraClassName);
    if (hide) return null;
    return (
        <>
            <button className={classNames.join(' ')} onClick={onClick} disabled={disabled} {...props}>
                {content}
            </button>
        </>
    );
};

export { Button, IButtonProps};