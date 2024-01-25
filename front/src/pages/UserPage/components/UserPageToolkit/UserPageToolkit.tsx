import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { replaceWithId } from '../../../../app/helpers/http';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { Button } from '../../../../UI';
import './styles/style.scss'

interface IUserPageToolkitProps {
    show?: boolean;
}

const UserPageToolkit: React.FC<IUserPageToolkitProps> = ({show = true}) => {

    const {isMobile} = useWindowSize();
    const {id} = useParams();
    const navigate = useNavigate();

    const handleSendMessage = () => {
        navigate(replaceWithId(RoutePaths.MESSAGE_PAGE_WITH_ID, id));
    }

    return (
        show ?
        <div className='toolkit-non-owner'>
            <Button content='Send Message' size={isMobile ? 'm' : 's'} onClick={handleSendMessage}/>
            <Button content='Add to Contact' size={isMobile ? 'm' : 's'} />
        </div>
        : null
    );
};

export {UserPageToolkit};