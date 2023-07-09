import React, { useState } from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { ModalWindow } from '../../../../components';
import { PostForm } from '../../../../modules/PostForm';
import { Button } from '../../../../UI';

interface IUserPostCreateProps {
    show?: boolean;
}

const UserPostCreate: React.FC<IUserPostCreateProps> = ({ show = true}) => {

    const [createPostModalActive, setCreatePostModalActive] = useState<boolean>(false);
    const { isMobile } = useWindowSize();

    return (
        show ?
        <>
            {isMobile ? 
                <>
                    <Button content='Create Post' size={isMobile ? 'm' : 's'} onClick={() => setCreatePostModalActive(true)}/>
                    <ModalWindow active={createPostModalActive} setActive={setCreatePostModalActive} controls={false}>
                        <PostForm />
                    </ModalWindow>
                </>
                : <PostForm />
            }
        </>
        : null
    );
};

export {UserPostCreate};