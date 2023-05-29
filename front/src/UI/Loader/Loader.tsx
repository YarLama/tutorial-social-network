import React from 'react';
import './styles/style.scss'

interface ILoader {
    color?: 'major' | 'minor';
    extraClassName?: string;
}

const LoaderRing: React.FC = () => {

    return (
        <div className={'loader-ring'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

const LoaderBlock: React.FC<ILoader> = ({
    extraClassName,
    color = 'major'
}) => {

    const classNames = [`loader-block`, color];
    if (extraClassName) classNames.push(extraClassName);

    return (
        <div className={classNames.join(' ')}></div>
    )
}

export {LoaderRing, LoaderBlock};