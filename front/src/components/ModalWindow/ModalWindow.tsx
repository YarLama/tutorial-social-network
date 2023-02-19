import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, IconButton } from '../../UI';
import './styles/style.scss';

interface IModalWindowProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode | string;
}

const ModalWindow: React.FC<IModalWindowProps> = ({ active, setActive, children}) => {
    return (
        !active ? null : 
        <>
            <div className='modal' onClick={() => setActive(false)}>
                <div className='modal-window' onClick={e => e.stopPropagation()}>
                    <div className='modal-window-tooltip'>
                        <IconButton type='s' icon='cancel' onClick={() => setActive(false)}/>
                    </div>
                    <div className='modal-window-content'>{children}</div>
                    <div className='modal-window-controls'>
                        <Button type='s' content='OK'/>
                        <Button type='s' content='Cancel' onClick={() => setActive(false)}/>
                    </div>
                </div> 
                <div className='modal-overlay'></div>
            </div>
        </>
    );
};

export {ModalWindow};