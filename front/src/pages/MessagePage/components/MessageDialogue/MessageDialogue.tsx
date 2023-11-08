import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getShortDate } from '../../../../app/helpers/common/time';
import { MessageModelType } from '../../../../app/helpers/types/models';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import MessageLetter from '../MessageLetter/MessageLetter';
import './styles/style.scss'

interface IMessageDialogueProps {
    penPalUserId: number;
}

const MessageDialogue: React.FC<IMessageDialogueProps> = ({penPalUserId}) => {

    const {penPalUsers} = useAppSelector(state => state.messageReducer);
    const {id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const currentUser = penPalUsers.find(penPalUser => penPalUser.id === penPalUserId);
    const {currentPenPalUserInfo} = useAppSelector(state => state.messageReducer);
    const unqiueDate = new Set(currentUser?.messages.map(message => getShortDate(message.createdAt)))
    
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

    const objectWithSortedMessages: {[date: string]: MessageModelType[][]} = {}

    unqiueDate.forEach(date => {
        objectWithSortedMessages[date] = sortByGroup(currentUser?.messages.filter(message => date === getShortDate(message.createdAt)))
    })

    const scrollToLastLetter = () => {
        const letterDivs = document.querySelectorAll('.messsage-letter');
        console.log(letterDivs)
        if (letterDivs.length > 0) {
            const lastLetterDiv = letterDivs[letterDivs.length - 1];
            console.log(lastLetterDiv)
            lastLetterDiv.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
    }

    useEffect(() => {
        if(penPalUserId != 0) scrollToLastLetter();
    }, [currentUser])

    if (penPalUserId <= 0) return <div className='message-dialogue-empty'>Choose your dialogue</div>

    return (
        <div className='message-dialogue'>
            {Object.keys(objectWithSortedMessages).map(SortArr => 
                <React.Fragment key={SortArr}>
                    <p className='message-dialogue-date-group'>{SortArr}</p>
                    {
                        objectWithSortedMessages[SortArr].map((messageGroup, index) => {
                            const isOwner = messageGroup[0].from_userId === authId;
                            const penPalName = isOwner ? 'You' : currentPenPalUserInfo.name ?? "Pen Pal";
                            return <div key={messageGroup[0].id}>
                                <MessageLetter penPalName={penPalName} messages={messageGroup} owner={isOwner}/>
                            </div> 
                        })
                    }
                </React.Fragment>
            )}
        </div>
    );
};

export default MessageDialogue;