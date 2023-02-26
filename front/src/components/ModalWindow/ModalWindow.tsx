import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Button, IconButton } from '../../UI';
import './styles/style.scss';

interface IModalWindowProps {
    active: boolean;
    controls?: boolean;
    controlsConfirmLabel?: string;
    controlsCancelLabel?: string;
    setActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode | string;
}

const ModalWindow: React.FC<IModalWindowProps> = ({ active, controls = true, setActive, controlsConfirmLabel = 'OK', controlsCancelLabel = 'Cancel', children}) => {

    const handleModalClose = () => {
        setActive(false)
    }

    useEffect(() => {
        active ? document.body.classList.add('body-no-scroll') : document.body.classList.remove('body-no-scroll');
    }, [active])

    
    return (
        active 
            ? 
            <>
                <div className='modal' onClick={handleModalClose}>
                    <div className='modal-window' onClick={e => e.stopPropagation()}>
                        <div className='modal-window-tooltip'>
                            <IconButton type='s' icon='cancel' onClick={handleModalClose}/>
                        </div>
                        <div className='modal-window-content'>{children}</div>
                        <div className='modal-window-controls'>
                            {controls
                                ? 
                                <>
                                    <Button type='s' content={controlsConfirmLabel}/>     
                                    <Button type='s' content={controlsCancelLabel} onClick={handleModalClose}/>
                                </>
                                : null
                            }        
                        </div> 
                    </div> 
                    <div className='modal-overlay'></div>
                </div>
            </>
            : null
    );
};

export {ModalWindow};