import React, { useState } from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ModalWindow } from '../../../../components';
import { Button, IconButton } from '../../../../UI';
import './styles/style.scss'

interface IUserPageDetailProps {
    name: string;
    about: string;
}

const UserPageDetail: React.FC<IUserPageDetailProps> = ({name, about}) => {
    
    const [detailModalActive, setDetailModalActive] = useState<boolean>(false);
    const { isMobile } = useWindowSize();
    const isNameBig = name.length > 30;
    const isAboutBig = about.length > 150;
    const aboutText = isAboutBig ? about.slice(0, 147) : about;

    const handleOpenModalClick = () => {
        setDetailModalActive(true)
    }

    return (
        <div className={`user-detail-box ${isMobile ? 'user-detail-mobile' : ''}`}>
            <div className={`user-detail-name ${isNameBig ? 'bigname' : ''}`}>
                {name}
                {isMobile && 
                    <span className='user-detail-info-mobile'>
                        <IconButton onClick={handleOpenModalClick} icon={'about'} extraClassName='user-detail-about-icon'/>
                    </span>
                }
            </div>
            {!isMobile &&
                <div className='user-detail-info'>
                    <p className='user-detail-property'>About:</p>
                    <div className='user-detail-about'>
                        {`${aboutText} `}
                        {isAboutBig && <Button content='...' size='xs' onClick={handleOpenModalClick}/>}  
                    </div>
                </div>
            }
            
            <ModalWindow active={detailModalActive} setActive={setDetailModalActive} controls={false}>
                <div>{about}</div> 
            </ModalWindow>
        </div>
            
    );
};

export {UserPageDetail};