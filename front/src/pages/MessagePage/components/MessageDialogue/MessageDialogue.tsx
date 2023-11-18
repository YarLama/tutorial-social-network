import React, { memo, useEffect, useRef, useState } from 'react';
import { Photo } from '../../../../app/api/photoApi/types';
import { getShortDate } from '../../../../app/helpers/common/time';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { messageSlice } from '../../../../app/store/reducers/MessageSlice';
import { MediaViewer } from '../../../../components';
import { MessageForm } from '../../../../modules/MessageForm/components/MessageForm/MessageForm';
import MessageLetter from '../MessageLetter/MessageLetter';
import MessageToolkit from '../MessageToolkit/MessageToolkit';
import './styles/style.scss'

interface IMessageDialogueProps {
    penPalUserId: number;
}

const MessageDialogue: React.FC<IMessageDialogueProps> = memo(({penPalUserId}) => {

    const dispatch = useAppDispatch();
    const {penPalUsers} = useAppSelector(state => state.messageReducer);
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const {currentPenPalUserInfo} = useAppSelector(state => state.messageReducer);

    const currentUser = penPalUsers.find(penPalUser => penPalUser.id === penPalUserId);
    const totalImageCount = currentUser?.messages.filter(message => message.image).length;
    
    const [mediaForModal, setMediaForModal] = useState<Photo | null>(null);
    const [mediaModalActive, setMediaModalActive] = useState<boolean>(false);
    const [objectWithSortedMessages, setObjectWithSortedMessages] = useState<{[date: string]: MessageModelType[][]}>({});
    const [loadedImageCount, setLoadedImageCount] = useState<number>(0);
    const [formPurpose, setFormPurpose] = useState<'create' | 'update'>('create');

    const lastGroupDiv = useRef<HTMLDivElement | null>(null);
    const isCurrentUserChanged = useRef<boolean>(true);
    
    const sortByGroup = (arr?: MessageModelType[]): MessageModelType[][] => {
        if (!arr) return []
        const finalArray = [];
        let currentGroup: MessageModelType[] = [];

        arr.forEach(message => {
            if (currentGroup.length === 0 || currentGroup[0].from_userId === message.from_userId) {
                currentGroup.push(message);
            } else {
                finalArray.push(currentGroup);
                currentGroup = [message];
            }
        });

        if (currentGroup.length > 0) finalArray.push(currentGroup)
        
        return finalArray;
    }

    const scrollToLastLetter = () => {
        if (lastGroupDiv.current) lastGroupDiv.current.scrollIntoView({block: 'end'});
    }

    const handleImageLoad = () => {
        setLoadedImageCount(prev => prev + 1);
    }

    const handleImageClick = (media: Photo) => {
        setMediaForModal(media)
        setMediaModalActive(true)
    }

    useEffect(() => {
        const unqiueDate = new Set(currentUser?.messages.map(message => getShortDate(message.createdAt)))
        const sortedMessages: {[date: string]: MessageModelType[][]} = {};
        unqiueDate.forEach(date => {
            sortedMessages[date] = sortByGroup(currentUser?.messages.filter(message => date === getShortDate(message.createdAt)))
        })
        setObjectWithSortedMessages(sortedMessages);
        setLoadedImageCount(0);
        setFormPurpose('create');
        const root = document.querySelector('.message-dialogue-content');
        if (root) {
            const messages = root.querySelectorAll('.selected-letter');
            messages.forEach(message => message.classList.remove('selected-letter'));
            dispatch(messageSlice.actions.resetSelectedMessages());
        }
    }, [currentUser, penPalUsers])

    useEffect(() => {
        if (loadedImageCount === totalImageCount && isCurrentUserChanged.current) {
            scrollToLastLetter()
            isCurrentUserChanged.current = false;
        }
    }, [currentUser, loadedImageCount])

    useEffect(() => {
        isCurrentUserChanged.current = true;
    }, [currentUser])
    
    if (penPalUserId <= 0 || Object.keys(objectWithSortedMessages).length === 0) return <div className='message-dialogue-empty'>Choose your dialogue</div>

    return (
        <div className='message-dialogue'>
            <MessageToolkit onEditClick={setFormPurpose}/>
            <div className='message-dialogue-content'>
                {Object.keys(objectWithSortedMessages).map(SortArr => 
                    <React.Fragment key={SortArr}>
                        <p className='message-dialogue-date-group'>{SortArr}</p>
                        {
                            objectWithSortedMessages[SortArr].map((messageGroup) => {
                                const isOwner = messageGroup[0].from_userId === authId;
                                const penPalName = isOwner ? 'You' : currentPenPalUserInfo.name ?? "Pen Pal";
                                return <div key={messageGroup[0].id} ref={lastGroupDiv}>
                                    <MessageLetter penPalName={penPalName} messages={messageGroup} owner={isOwner} onLoadComplete={handleImageLoad} onSelectedChange={setFormPurpose} onImageClick={handleImageClick}/>
                                </div> 
                            })
                        }
                    </React.Fragment>
                )}
            </div>
            <div className='message-dialogue-form-create'>
                <MessageForm from={authId as number} to={penPalUserId} purpose={formPurpose}/>
            </div>
            <MediaViewer active={mediaModalActive} setActive={setMediaModalActive} elements={mediaForModal ? [mediaForModal] : null}/>
        </div>
    );
});

export default MessageDialogue;