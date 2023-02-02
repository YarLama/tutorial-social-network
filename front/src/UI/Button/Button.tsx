import React, { MouseEventHandler } from 'react';
import './styles/style.scss'

interface IButtonProps {
    content: string;
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IButtonProps> = ({content, extraClassName, onClick, ...props}) => {

    const classNames = ['button-ui'];

    if (extraClassName) classNames.push(extraClassName);

    return (
        <>
            <button className={classNames.join(' ')} onClick={onClick} {...props}>
                {content}
            </button>
        </>
    );
};

export { Button, IButtonProps};