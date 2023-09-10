import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserAvatarQuery } from '../../../../app/api/userApi';
import { getLocalToken, getUserInfoFromLocalToken } from '../../../../app/helpers/common/auth/tokenHelpers';
import { getImageUrl, replaceWithId } from '../../../../app/helpers/http';
import { PostModelType } from '../../../../app/helpers/types/models';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { Avatar, Post } from '../../../../components';

interface IPostInfoProps {
    post: PostModelType;
}

const PostInfo: React.FC<IPostInfoProps> = ({post}) => {

    const navigate = useNavigate();
    const ownerDropupItems: DropupItem[] = [];
    const guestDropupItems: DropupItem[] = [];
    const isOwner = post.userId === getUserInfoFromLocalToken().id;
    const dropupItems = isOwner ? ownerDropupItems : guestDropupItems;
    const { data } = useGetUserAvatarQuery(post.userId);
    
    return (
        <div>
            <div onClick={() => navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, post.userId))}>
                <Avatar size='m' src={data ? getImageUrl(data.image) : undefined}/>
            </div>
            <Post 
                postId={post.id}
                createdAt={post.createdAt}
                contentText={post.content}
                contentImage={getImageUrl(post.image)}
                dropupItems={dropupItems}
            />
        </div>
    );
};

export default PostInfo;