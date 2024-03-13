import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { messageApi } from '../../../../app/api/messageApi';
import { replaceWithId } from '../../../../app/helpers/http';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { IconButton } from '../../../../UI';
import './styles/style.scss'

interface IMessageToolkitProps {
    onEditClick?: Dispatch<SetStateAction<"create" | "update">>;
}

const MessageToolkit: React.FC<IMessageToolkitProps> = ({onEditClick}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteMessage] = messageApi.useDeleteMessageMutation();
    const { selectedMessages, currentPenPalUserInfo } = useAppSelector(state => state.messageReducer);

    const [isOwnerSelectedMessage, setIsOwnerSelectedMessage] = useState<boolean>(false);

    const handleBackClick = () => {
        dispatch(messageSlice.actions.resetCurrentPenPalUserInfo())
    }

    const handleNameClick = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, currentPenPalUserInfo.id))
    }

    const handleClearClick = () => {
        const root = document.querySelector('.message-dialogue-content');
        if (root) {
            const messages = root.querySelectorAll('.selected-letter');
            messages.forEach(message => message.classList.remove('selected-letter'));
            dispatch(messageSlice.actions.resetSelectedMessages());
        }
    }

    const handleEditClick = () => {
        if (onEditClick) {
            if (isOwnerSelectedMessage) {
                onEditClick('update');
            }
        }
    }

    const handleDeleteClick = async () => {
        if (selectedMessages) {
            const messageDeletePromise = async (id: number) => {
                deleteMessage({id});
            }
            const deleteRequests = selectedMessages.map(id => messageDeletePromise(id))
            await Promise.all(deleteRequests)
                .then(results => {
                    dispatch(messageSlice.actions.deleteSelectedMessages());

                })
        }
        
    }

    useEffect(() => {
        if (selectedMessages.length === 1) {
            const root = document.querySelector('.message-dialogue-content');
            if(root) {
                const message = root.querySelector('.selected-letter');
                if (message) {
                    if (message.parentElement) setIsOwnerSelectedMessage(message.parentElement.classList.contains('owner-letter'))
                }
            }
        } else setIsOwnerSelectedMessage(false);
    }, [selectedMessages])

    return (
        <div className='message-dialogue-toolkit'>
            {
                selectedMessages.length === 0 ? 
                    <>
                        <div className='back-btn' onClick={handleBackClick}><IconButton icon='left' size='s' text={'back'}/></div>
                        <div className='name-btn' onClick={handleNameClick}>{currentPenPalUserInfo.name}</div>
                    </>
                : 
                    <>
                        <div className='clear-btn' onClick={handleClearClick}><IconButton icon='cancel' size='s' text={'clear'}/></div>
                        <p>{`Messages selected: ${selectedMessages.length}`}</p>
                        <div className='control-btns'>
                            {(selectedMessages.length === 1 && isOwnerSelectedMessage) && <div className='edit-btn' onClick={handleEditClick}><IconButton icon='edit' size='s'/></div>}
                            <div className='delete-btn' onClick={handleDeleteClick}><IconButton icon='cancel' size='s'/></div>
                        </div>
                        
                    </>
            }
        </div>
    );
};

export default MessageToolkit;