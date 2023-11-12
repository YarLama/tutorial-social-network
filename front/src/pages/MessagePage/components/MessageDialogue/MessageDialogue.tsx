import React, { memo, useEffect, useRef, useState } from 'react';
import { getShortDate } from '../../../../app/helpers/common/time';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { MessageForm } from '../../../../modules/MessageForm/components/MessageForm/MessageForm';
import MessageLetter from '../MessageLetter/MessageLetter';
import './styles/style.scss'

interface IMessageDialogueProps {
    penPalUserId: number;
}

const MessageDialogue: React.FC<IMessageDialogueProps> = memo(({penPalUserId}) => {

    const {penPalUsers} = useAppSelector(state => state.messageReducer);
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const currentUser = penPalUsers.find(penPalUser => penPalUser.id === penPalUserId);
    const totalImageCount = currentUser?.messages.filter(message => message.image).length;
    const {currentPenPalUserInfo} = useAppSelector(state => state.messageReducer);
    const [objectWithSortedMessages, setObjectWithSortedMessages] = useState<{[date: string]: MessageModelType[][]}>({});
    const [loadedImageCount, setLoadedImageCount] = useState<number>(0);
    const lastGroupDiv = useRef<HTMLDivElement | null>(null);
    
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
        if (lastGroupDiv.current) lastGroupDiv.current.scrollIntoView({block: 'end'})
    }

    const handleImageLoad = () => {
        setLoadedImageCount(prev => prev + 1);
    }

    useEffect(() => {
        const unqiueDate = new Set(currentUser?.messages.map(message => getShortDate(message.createdAt)))
        const sortedMessages: {[date: string]: MessageModelType[][]} = {};
        unqiueDate.forEach(date => {
            sortedMessages[date] = sortByGroup(currentUser?.messages.filter(message => date === getShortDate(message.createdAt)))
        })
        setObjectWithSortedMessages(sortedMessages);
        setLoadedImageCount(0);
    }, [currentUser])

    useEffect(() => {
        scrollToLastLetter()
        if (loadedImageCount === totalImageCount) scrollToLastLetter()
    }, [currentUser?.messages, loadedImageCount])

    if (penPalUserId <= 0) return <div className='message-dialogue-empty'>Choose your dialogue</div>

    return (
        <div className='message-dialogue'>
            <div className='message-dialogue-content'>
                {Object.keys(objectWithSortedMessages).map(SortArr => 
                    <React.Fragment key={SortArr}>
                        <p className='message-dialogue-date-group'>{SortArr}</p>
                        {
                            objectWithSortedMessages[SortArr].map((messageGroup) => {
                                const isOwner = messageGroup[0].from_userId === authId;
                                const penPalName = isOwner ? 'You' : currentPenPalUserInfo.name ?? "Pen Pal";
                                return <div key={messageGroup[0].id} ref={lastGroupDiv}>
                                    <MessageLetter penPalName={penPalName} messages={messageGroup} owner={isOwner} onLoadComplete={handleImageLoad}/>
                                </div> 
                            })
                        }
                    </React.Fragment>
                )}
            </div>
            <div className='message-dialogue-form-create'>
                <MessageForm from={authId as number} to={penPalUserId}/>
            </div>
        </div>
    );
});

export default MessageDialogue;