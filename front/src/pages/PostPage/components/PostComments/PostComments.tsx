import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentApi, useGetPostCommentsQuery } from '../../../../app/api/commentApi';
import { CommentModelType } from '../../../../app/helpers/types/models';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { commentSlice } from '../../../../app/store/reducers/CommentSlice';
import { ModalWindow } from '../../../../components';
import { CommentUpdateForm } from '../../../../modules/CommentUpdateForm';
import { LoaderRing } from '../../../../UI';
import PostComment from '../PostComment/PostComment';

interface IPostCommentsProps {
    id: number;
}

const PostComments: React.FC<IPostCommentsProps> = ({id}) => {
    
    const [editCommentModalActive, setEditCommentModalActive] = useState<boolean>(false);
    const [updateCommentInfo, setUpdateCommentInfo] = useState<CommentModelType | null>()
    const { id: authId} = useAppSelector(state => state.authReducer.authUserInfo);
    const { data, isLoading, refetch } = useGetPostCommentsQuery(id);
    const { comments } = useAppSelector(state => state.commentReducer);
    const dispatch = useAppDispatch();
    const [deleteComment] = commentApi.useDeleteCommentMutation();

    useEffect(() => {
        if (!!data?.length) dispatch(commentSlice.actions.setComments(data))
    }, [data]);

    useEffect(() => {
        refetch();
    }, [comments]);

    const ownerDropupItems : DropupItem[] = [
        {label: 'Edit', onClick: (e) => handleUpdateComment(e)},
        {label: 'Delete', onClick: (e) => handleDeleteComment(e)}
    ]

    const guestDropupItems : DropupItem[] = [
        {label: 'Share', onClick: () => console.log('SHARE CLICK')},
    ]

    const handleUpdateComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const commentRoot = (e.target as HTMLElement).closest('.comment-box');
        if (!commentRoot) return;
        const id = Number(commentRoot.getAttribute('data-comment-id'));
        const comment: CommentModelType | undefined = comments?.find(comment => comment.id === id) 
        if (!comment) return;
        setUpdateCommentInfo(comment);
        setEditCommentModalActive(true);
    }

    const handleDeleteComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const commentRoot = (e.target as HTMLElement).closest('.comment-box');
        if (!commentRoot) return;
        const id = Number(commentRoot.getAttribute('data-comment-id'));
        try {
            const responce = await deleteComment({id: id}).unwrap();
            dispatch(commentSlice.actions.deleteComment(id));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        !isLoading ?
            data && data.length > 0 ?
                <>
                    {comments.map(comment => 
                        <PostComment 
                            key={comment.id} 
                            id={comment.id} 
                            ownerId={comment.userId} 
                            content={comment.content} 
                            createdAt={comment.createdAt} 
                            dropupItems={comment.userId === authId ? ownerDropupItems : guestDropupItems}
                        />
                    )}
                    <ModalWindow active={editCommentModalActive} setActive={setEditCommentModalActive} controls={false}>
                        {updateCommentInfo && <CommentUpdateForm 
                            id={updateCommentInfo.id}
                            userId={updateCommentInfo.userId}
                            content={updateCommentInfo.content}
                            setShowModal={setEditCommentModalActive}
                        />}
                    </ModalWindow>
                </>
            : <div style={{'color': 'white', 'fontSize': '16pt'}}>
                Comments not found
            </div>
        : <LoaderRing />
    );
};

export default PostComments;