import React, { forwardRef } from 'react';
import { getTime } from '../../../../app/helpers/common/time';
import { getImageUrl } from '../../../../app/helpers/http';
import { MessageModelType } from '../../../../app/helpers/types/models';
import './styles/style.scss'

interface IMessageLetterProps {
    penPalName: string;
    messages?: MessageModelType[];
    owner: boolean;
    forwardRef?: React.Ref<HTMLDivElement> | null;
}

const MessageLetter: React.FC<IMessageLetterProps> = ({penPalName, messages, owner}) => {
    
    const classNames = ['messsage-letter', owner ? 'owner-letter' : 'penpal-letter']

    if (!messages) return null;
    

    return (
        <div className={classNames.join(' ')}>
            <div className='message-letter-onwer'>{penPalName}</div>
            {messages.map(message =>
                <div key={message.id} className='message-letter-box'> 
                    <div className='message-letter-content'>
                        {message.content ? <p className='message-letter-content-text'>{message.content}</p>: null}
                        {message.image ? 
                            <div className='message-letter-content-image'>
                                <img src={getImageUrl(message.image)}/>
                            </div> 
                        : null}
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