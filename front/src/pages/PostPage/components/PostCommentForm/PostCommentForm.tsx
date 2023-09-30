import React, { useState } from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ModalWindow } from '../../../../components';
import { CommentForm } from '../../../../modules/CommentForm';
import { Button } from '../../../../UI';
import './styles/style.scss'

const PostCommentForm: React.FC = () => {
    
    const [sendCommentModalActive, setSendCommentModalActive] = useState<boolean>(false);
    const { isMobile } = useWindowSize();

    return (
        isMobile ?
            <>
                <Button content='Send Comment' size='m' onClick={() => setSendCommentModalActive(true)} extraClassName={'send-comment-modal-btn'}/>
                <ModalWindow active={sendCommentModalActive} setActive={setSendCommentModalActive} controls={false}>
                    <CommentForm />    
                </ModalWindow>     
            </>
        : <CommentForm />
    );
};

export {PostCommentForm};