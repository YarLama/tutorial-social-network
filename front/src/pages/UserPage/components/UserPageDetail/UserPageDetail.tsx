import React, { useState } from 'react';
import { ModalWindow } from '../../../../components';
import { Button } from '../../../../UI';
import './styles/style.scss'

interface IUserPageDetailProps {
    name: string;
    about: string;
}

const UserPageDetail: React.FC<IUserPageDetailProps> = ({name, about}) => {
    
    const [detailModalActive, setDetailModalActive] = useState<boolean>(false);
    const isNameBig = name.length > 30;
    const isAboutBig = about.length > 150;
    const aboutText = isAboutBig ? about.slice(0, 147) : about;

    const handleOpenModalClick = () => {
        setDetailModalActive(true)
    }

    return (
        <div className='user-detail-box'>
            <div className={`user-detail-name ${isNameBig ? 'bigname' : ''}`}>{name}</div>
            <div className='user-detail-info'>
                <p className='user-detail-property'>About:</p>
                <div className='user-detail-about'>
                    {`${aboutText} `}
                    {isAboutBig && <Button content='...' size='xs' onClick={handleOpenModalClick}/>}   
                </div>
            </div>
            <ModalWindow active={detailModalActive} setActive={setDetailModalActive} controls={false}>
                <div>{about}</div>
                
            </ModalWindow>
        </div>
            
    );
};

export {UserPageDetail};