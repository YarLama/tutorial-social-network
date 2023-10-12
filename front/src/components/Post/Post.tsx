import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commentApi } from '../../app/api/commentApi';
import { likeApi } from '../../app/api/likeApi';
import { getDate } from '../../app/helpers/common/time';
import { replaceWithId } from '../../app/helpers/http';
import { DropupItem } from '../../app/helpers/types/ui';
import { useAppSelector } from '../../app/hooks/redux/redux';
import { IconButton } from '../../UI';
import './styles/style.scss'

interface IPostProps {
    postId: number;
    createdAt: string;
    contentText?: string;
    contentImage?: string | null;
    navigateTo?: string;
    dropupItems?: DropupItem[];
    handleImageClick?: () => void;
}

const Post: React.FC<IPostProps> = ({ postId, contentText, contentImage, navigateTo, dropupItems, createdAt, handleImageClick = () => null }) => {

    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentsCount, setCommentsCount] = useState<number>(0);
    const [isCommented, setIsCommented] = useState<boolean>(false);

    const {data: postLikesInfo, refetch: postLikeRefetch} = likeApi.useGetPostLikesInfoQuery(postId);
    const {data: postCommentsInfo, refetch: postCommentRefetch} = commentApi.useGetPostCommentsInfoQuery(postId);
    const [createLike] = likeApi.useCreateLikePostMutation();
    const [deleteLike] = likeApi.useDeleteLikePostMutation();
    const { id: userId } = useAppSelector(state => state.authReducer.authUserInfo)
    const { comments } = useAppSelector(state => state.commentReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (postLikesInfo) {
            setLikesCount(postLikesInfo.countLikes);
            setIsLiked(postLikesInfo.isUserLikeOwner);
        }
    }, [postLikesInfo]);

    useEffect(() => {
        postLikeRefetch()
    }, [likesCount])

    useEffect(() => {
        if (postCommentsInfo) {
            setCommentsCount(postCommentsInfo.countComments);
            setIsCommented(postCommentsInfo.isUserCommented);
        }
    }, [postCommentsInfo]);

    useEffect(() => {
        postCommentRefetch()
    }, [comments])

    const handleCommentClick = () => {
        navigateTo ? navigate(replaceWithId(navigateTo, postId)) : undefined
    }

    const handleLikeClick = async () => {
        try {
            isLiked ? 
                await deleteLike({id: postId}).unwrap()
            : await createLike({userId: userId as number, postId: postId}).unwrap()
            setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
            setIsLiked(!isLiked)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='post-box' data-post-id={postId}>
            <div className='post-toolkit'>
                <span className='post-toolkit-detail'>
                    <div className='detail-dropup'>
                        {dropupItems ?
                            <>
                                {dropupItems.map((el, index) => <span className='dropup-element' key={index} onClick={el.onClick}>{el.label}</span>)}
                            </>
                            : null
                        }
                    </div>
                </span>
            </div>
            <div className='post-content' onClick={navigateTo ? () => navigate(replaceWithId(navigateTo, postId)) : undefined}>
                {contentText ?
                    <div className='post-content-text'> {contentText} </div>
                    : null
                }
                {contentImage ?
                    <div className='post-content-image' onClick={handleImageClick}> <img src={contentImage} /> </div>
                    : null
                }
            </div>
            <div className='post-info'>
                <div className='post-info-date'>{getDate(createdAt)}</div>
                <div className='post-info-likes'>
                    <IconButton icon='like' size='s' text={String(likesCount)} isActive={isLiked} onClick={handleLikeClick}/>
                </div>
                <div className='post-info-comments'>
                    <IconButton icon='comment' size='s' text={String(commentsCount)} isActive={isCommented} onClick={handleCommentClick}/>
                </div>
            </div>
        </div>
    );
};

export {Post};