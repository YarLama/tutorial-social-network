import React from 'react';
import { getDate } from '../../../../app/helpers/common/time';
import { MessageModelType } from '../../../../app/helpers/types/models';
import './styles/style.scss'

interface IMessageLetterProps {
    penPalName: string;
    messages?: MessageModelType[];
    owner: boolean;
}

const MessageLetter: React.FC<IMessageLetterProps> = ({penPalName, messages, owner}) => {
    
    const classNames = ['messsage-letter', owner ? 'owner-letter' : 'penpal-letter']

    if (!messages) return null;

    return (
        <div className={classNames.join(' ')}>
            <div>{penPalName}</div>
            {messages.map(message =>
                <div key={message.id}> 
                    <div className='message-letter-contetnt'>
                        {message.content}
                    </div>
                    <div className='message-letter-date'>
                        {getDate(message.createdAt)}
                    </div>
                </div>  
            )}
        </div>
    );
};

export default MessageLetter;