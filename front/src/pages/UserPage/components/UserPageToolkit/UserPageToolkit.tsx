import React from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { Button } from '../../../../UI';
import './styles/style.scss'

interface IUserPageToolkitProps {
    show?: boolean;
}

const UserPageToolkit: React.FC<IUserPageToolkitProps> = ({show = true}) => {

    const { isMobile } = useWindowSize();

    return (
        show ?
        <div className='toolkit-non-owner'>
            <Button content='Send Message' size={isMobile ? 'm' : 's'} />
            <Button content='Add to Contact' size={isMobile ? 'm' : 's'} />
        </div>
        : null
    );
};

export {UserPageToolkit};