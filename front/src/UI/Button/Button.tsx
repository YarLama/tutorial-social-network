import React, { MouseEventHandler } from 'react';
import './styles/style.scss'

interface IButtonProps {
    content: string;
    type?: 's' | 'm' | 'l';
    extraClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<IButtonProps> = ({content, extraClassName, type = 'm', onClick, ...props}) => {

    const classNames = ['btn'];

    classNames.push(type === 'm' ? 'btn-m' : type === 's' ? 'btn-s' : 'btn-l')

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