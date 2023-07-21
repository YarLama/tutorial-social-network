import React, { Fragment, MouseEvent, useState } from 'react';
import { userApi } from '../../../../app/api/userApi';
import { getImageUrl } from '../../../../app/helpers/http';
import { PostModelType } from '../../../../app/helpers/types/models';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { ModalWindow, Post } from '../../../../components';
import { PostUpdateForm } from '../../../../modules/PostUpdateForm';

interface IUserPostsProps {
    id: number;
    isOwner: boolean;
}

type TestLocalPost = { id: number, content: string, imageSrc : string | undefined}

const UserPosts: React.FC<IUserPostsProps> = ({isOwner = true, id}) => {

    const [editModalActive, setEditModalActive] = useState<boolean>(false);
    const [updatePostInfo, setUpdatePostInfo] = useState<PostModelType | null>();
    const { data: posts, isLoading: isPostsLoading} = userApi.useGetUserPostsQuery(id);
    
    const ownerDropupItems : DropupItem[] = [
        {label: 'Edit', onClick: (e) => handleUpdatePostInfo(e)},
        {label: 'Delete', onClick: () => console.log('DELETE CLICK')}
    ]

    const guestDropupItems : DropupItem[] = [
        {label: 'Share', onClick: () => console.log('SHARE CLICK')},
    ]

    const handleUpdatePostInfo = (e: MouseEvent) => {
        const postRoot = (e.target as HTMLElement).closest('.post-box');
        if (!postRoot) return;
        const id = postRoot.getAttribute('data-post-id');
        const post: PostModelType | undefined = posts?.find(post => post.id === Number(id));
        if (!post) return;
        setUpdatePostInfo(post)
        setEditModalActive(true);
    }

    console.log(posts)

    return (
        posts ? 
            <>
                {posts.map((post) => 
                    <Post 
                        key={post.id}
                        postId={post.id}
                        contentText={post.content} 
                        contentImage={getImageUrl(post.image)} 
                        dropupItems={isOwner ? ownerDropupItems : guestDropupItems}
                        createdAt={post.createdAt}
                    />
                )}
                <ModalWindow active={editModalActive} setActive={setEditModalActive} controls={false}>
                    {updatePostInfo && <PostUpdateForm postId={updatePostInfo.id} content={updatePostInfo.content} image={getImageUrl(updatePostInfo.image)} isCommentable={false}/>}
                </ModalWindow>
            </>
            : <div>Здесь постов еще нет</div>
    );
};

export {UserPosts};