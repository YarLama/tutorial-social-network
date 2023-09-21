import React from 'react';
import { useGetCommentLikesInfoQuery } from '../../../../app/api/likeApi';
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

interface IPostCommentProps {
    id: number;
    ownerId: number;
    content: string;
    createdAt: string;
}

const PostComment: React.FC<IPostCommentProps> = ({id, ownerId, content, createdAt}) => {

    const { data: likesData, isLoading: likesLoading} = useGetCommentLikesInfoQuery(id);
    const { data: avatarData, isLoading: avatarLoading } = useGetUserAvatarQuery(ownerId);
    const { data: userData, isLoading: userLoading} = useGetUserByIdQuery(ownerId);
    const isDataLoaded = !likesLoading && !avatarLoading && !userLoading;
    const { isMobile } = useWindowSize();
    const navigate = useNavigate();

    const handleClickProfile = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, ownerId))
    }

    return (
        isDataLoaded ?
            <div className='post-comment'>
                {!isMobile ?
                    <div className='avatar-box' onClick={handleClickProfile}>
                        <Avatar size='s' src={avatarData ? getImageUrl(avatarData.image) : undefined}/>
                    </div>    
                : null}
                <div className='comment-box'>
                    <div className='comment-user-info' onClick={handleClickProfile}>{userData ? convertToFullName(userData?.first_name, userData?.last_name, userData?.middle_name) : null}</div>
                    <div className='comment-content'>{content}</div>
                    <div className='comment-info'>
                        <div className='comment-info-date'>{getDate(createdAt)}</div>
                        <div className='comment-info-likes'>
                            <IconButton icon='like' size='s'/>
                            {likesData?.countLikes || 0}
                        </div>
                    </div>
                </div>
            </div>
        : <LoaderBlock />
    );
};

export default PostComment;