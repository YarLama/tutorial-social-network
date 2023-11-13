import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { getTime } from '../../../../app/helpers/common/time';
import { getImageUrl } from '../../../../app/helpers/http';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { MediaViewer } from '../../../../components';
import './styles/style.scss'

interface IMessageLetterProps {
    penPalName: string;
    messages?: MessageModelType[];
    owner: boolean;
    onLoadComplete?: () => void;
    onSelectedChange?: Dispatch<SetStateAction<"create" | "update">>;
}

const MessageLetter: React.FC<IMessageLetterProps> = ({penPalName, messages, owner, onLoadComplete, onSelectedChange}) => {
    
    const [mediaModalActive, setMediaModalActive] = useState<boolean>(false);
    const classNames = ['messsage-letter', owner ? 'owner-letter' : 'penpal-letter']

    if (!messages) return null;

    const dispatch = useAppDispatch();
    const { selectedMessages } = useAppSelector(state => state.messageReducer)

    const targetRef = useRef<HTMLDivElement | null>(null);
    const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const holdStart = () => {
        if (holdRef.current) return;
        holdRef.current = setTimeout(() => {
            if (targetRef.current) { 
                if (!targetRef.current.classList.contains('selected-letter')) {
                    targetRef.current.classList.add('selected-letter')
                    dispatch(messageSlice.actions.addSelectedMessageId(Number(targetRef.current.dataset.id)))
                } else {
                    targetRef.current.classList.remove('selected-letter');
                    dispatch(messageSlice.actions.removeSelectedMessageId(Number(targetRef.current.dataset.id)))
                }
                targetRef.current = null;
            }
        }, 400)
    }

    const holdInterrupt = () => {
        if (holdRef.current) {
            clearTimeout(holdRef.current);
            holdRef.current = null;
            targetRef.current = null;
        }

        if (targetRef.current) targetRef.current = null;
    }

    const handleHold = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        targetRef.current = (e.target as HTMLElement).closest('.message-letter-box');
        holdStart();
    }

    useEffect(() => {
        if (onSelectedChange) onSelectedChange('create')
    }, [selectedMessages])

    useEffect(() => {
        () => holdInterrupt()
    }, [])

    return (
        <div className={classNames.join(' ')}>
            <div className='message-letter-owner'>{penPalName}</div>
            {messages.map(message =>
                <div 
                    key={message.id} 
                    data-id={message.id} 
                    className='message-letter-box' 
                    onMouseDown={(e) => handleHold(e)} 
                    onMouseUp={holdInterrupt}
                    onMouseMove={holdInterrupt}
                    onTouchStart={(e) => handleHold(e)} 
                    onTouchEnd={holdInterrupt} 
                    onTouchMove={holdInterrupt}
                > 
                    <div className={['message-letter-content'].join(' ')}>
                        {message.content && <p className='message-letter-content-text'>{message.content}</p>}
                        {message.image && 
                            <div className='message-letter-content-image'>
                                <img src={getImageUrl(message.image)} onLoad={onLoadComplete} onClick={() => setMediaModalActive(true)}/>
                                <MediaViewer active={mediaModalActive} setActive={setMediaModalActive} elements={[{id: message.id, image: message.image, is_avatar: false}]}/>
                            </div>
                        }
                    </div>
                    <div className='message-letter-date'>
                        {getTime(message.createdAt)}
                    </div>
                </div>  
            )}
        </div>
    );
};

export default MessageLetter;