import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Photo } from '../../../../app/api/photoApi/types';
import { postApi } from '../../../../app/api/postApi';
import { useGetUserAvatarQuery } from '../../../../app/api/userApi';
import { getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { PostModelType } from '../../../../app/helpers/types/models';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { useAppDispatch } from '../../../../app/hooks/redux/redux';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { postSlice } from '../../../../app/store/reducers/PostSlice';
import { Avatar, MediaViewer, ModalWindow, Post } from '../../../../components';
import { PostUpdateForm } from '../../../../modules/PostUpdateForm';
import './styles/style.scss'

interface IPostInfoProps {
    post: PostModelType;
}

const PostInfo: React.FC<IPostInfoProps> = ({post}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [editModalActive, setEditModalActive] = useState<boolean>(false);
    const [postMediaActive, setPostMediaActive] = useState<boolean>(false);
    const ownerDropupItems: DropupItem[] = [
        {label: 'Edit', onClick: () => handleUpdatePostInfo()},
        {label: 'Delete', onClick: () => handleDeletePost()}
    ];
    const guestDropupItems: DropupItem[] = [];
    const isOwner = post.userId === getUserInfoFromLocalToken().id;
    const dropupItems = isOwner ? ownerDropupItems : guestDropupItems;
    const { data } = useGetUserAvatarQuery(post.userId);
    const [ deletePost ] = postApi.useDeletePostMutation();
    const { isMobile } = useWindowSize();

    const handleUpdatePostInfo = () => {
        setEditModalActive(true);
    }

    const handleDeletePost = async () => {
        try {
            const responce = await deletePost(post.id).unwrap();
            dispatch(postSlice.actions.deletePost(post.id))
            navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, post.userId))
        } catch (e) {
            console.log(e);
        }
    }

    const handlePostImageClick = () => {
        setPostMediaActive(true);
    }
    
    return (
        <div className='post-page-info'>
            {!isMobile ? 
                <div className='post-page-info-avatar' onClick={() => navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, post.userId))}>
                    <Avatar size='m' src={data ? getImageUrl(data.image) : undefined}/>
                </div>
            : null}
            <div className='post-page-info-content'>
                <Post 
                    postId={post.id}
                    createdAt={post.createdAt}
                    contentText={post.content}
                    contentImage={getImageUrl(post.image)}
                    dropupItems={dropupItems}
                    handleImageClick={handlePostImageClick}
                />
            </div>
            <ModalWindow active={editModalActive} setActive={setEditModalActive} controls={false}>
                <PostUpdateForm 
                    postId={post.id} 
                    content={post.content} 
                    image={getImageUrl(post.image)} 
                    isCommentable={post.is_commentable}
                    setShowModal={setEditModalActive}
                />
            </ModalWindow>
            {post.image ?
                <MediaViewer active={postMediaActive} setActive={setPostMediaActive} elements={[{id: post.id, image: post.image, is_avatar: false}]}/>
            : null}
        </div>
    );
};

export default PostInfo;