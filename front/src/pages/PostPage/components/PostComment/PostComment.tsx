import React, { useEffect, useState } from 'react';
import { likeApi, useGetCommentLikesInfoQuery } from '../../../../app/api/likeApi';
import { useGetUserAvatarQuery, useGetUserByIdQuery } from '../../../../app/api/userApi';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { convertToFullName } from '../../../../app/helpers/common/text'
import { Avatar } from '../../../../components';
import { IconButton, LoaderBlock } from '../../../../UI';
import { getDate } from '../../../../app/helpers/common/time';
import './styles/style.scss'
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { useAppSelector } from '../../../../app/hooks/redux/redux';

interface IPostCommentProps {
    id: number;
    ownerId: number;
    content: string;
    createdAt: string;
    dropupItems?: DropupItem[];
}

const PostComment: React.FC<IPostCommentProps> = ({id, ownerId, content, createdAt, dropupItems}) => {

    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { data: likesData, isLoading: likesLoading, refetch: likesRefetch} = useGetCommentLikesInfoQuery(id);
    const { data: avatarData, isLoading: avatarLoading } = useGetUserAvatarQuery(ownerId);
    const { data: userData, isLoading: userLoading} = useGetUserByIdQuery(ownerId);
    const [createLike] = likeApi.useCreateLikeCommentMutation();
    const [deleteLike] = likeApi.useDeleteLikeCommentMutation();
    const { id: userId } = useAppSelector(state => state.authReducer.authUserInfo)
    const isDataLoaded = !likesLoading && !avatarLoading && !userLoading;
    const { isMobile } = useWindowSize();
    const navigate = useNavigate();

    useEffect(() => {
        if (likesData) {
            setLikesCount(likesData.countLikes);
            setIsLiked(likesData.isUserLikeOwner);
        }
    }, [likesData]);

    useEffect(() => {
        likesRefetch()
    }, [likesCount])

    const handleClickProfile = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, ownerId))
    }

    const handleLikeClick = async () => {
        try {
            isLiked ? 
                await deleteLike({id: id}).unwrap()
            : await createLike({userId: userId as number, commentId: id}).unwrap()
            setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
            setIsLiked(!isLiked)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        isDataLoaded ?
            <div className='post-comment'>
                {!isMobile ?
                    <div className='avatar-box' onClick={handleClickProfile}>
                        <Avatar size='s' src={avatarData ? getImageUrl(avatarData.image) : undefined}/>
                    </div>    
                : null}
                <div className='comment-box' data-comment-id={id}>
                    <div className='comment-detail'>
                        <div className='comment-username-detail' onClick={handleClickProfile} >{userData ? convertToFullName(userData?.first_name, userData?.last_name, userData?.middle_name) : null}</div>
                        <div className='comment-toolkit'>
                            <span className='comment-toolkit-detail'>
                                {dropupItems ?
                                    <div className='detail-dropup'>
                                        {dropupItems.map((el, index) => <span className='dropup-element' key={index} onClick={el.onClick}>{el.label}</span>)}
                                    </div>
                                    : null
                                }
                            </span>
                        </div>
                    </div>
                    <div className='comment-content'>{content}</div>
                    <div className='comment-info'>
                        <div className='comment-info-date'>{getDate(createdAt)}</div>
                        <div className='comment-info-likes'>
                            <IconButton icon='like' size='s' text={String(likesCount)} isActive={isLiked} onClick={handleLikeClick}/>
                        </div>
                    </div>
                </div>
            </div>
        : <LoaderBlock />
    );
};

export default PostComment;