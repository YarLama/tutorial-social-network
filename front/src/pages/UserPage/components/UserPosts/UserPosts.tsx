import React, { MouseEvent, useEffect, useState } from 'react';
import { postApi } from '../../../../app/api/postApi';
import { userApi } from '../../../../app/api/userApi';
import { getImageUrl } from '../../../../app/helpers/http';
import { PostModelType } from '../../../../app/helpers/types/models';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks/redux/redux';
import { RoutePaths } from '../../../../app/routes/constants/routePaths';
import { postSlice } from '../../../../app/store/reducers/PostSlice';
import { ModalWindow, Post } from '../../../../components';
import { PostUpdateForm } from '../../../../modules/PostUpdateForm';

interface IUserPostsProps {
    id: number;
    isOwner: boolean;
}

const UserPosts: React.FC<IUserPostsProps> = ({isOwner = true, id}) => {

    const [editModalActive, setEditModalActive] = useState<boolean>(false);
    const [updatePostInfo, setUpdatePostInfo] = useState<PostModelType | null>();
    const { data, isLoading: isPostsLoading} = userApi.useGetUserPostsQuery(id);
    const {posts} = useAppSelector(state => state.postReducer);
    
    const dispatch = useAppDispatch();
    const [ deletePost ] = postApi.useDeletePostMutation();

    useEffect(() => {
        if (!!data?.length) dispatch(postSlice.actions.setPosts(data))
    }, [data]);
    
    const ownerDropupItems : DropupItem[] = [
        {label: 'Edit', onClick: (e) => handleUpdatePostInfo(e)},
        {label: 'Delete', onClick: (e) => handleDeletePost(e)}
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

    const handleDeletePost = async (e: MouseEvent) => {
        const postRoot = (e.target as HTMLElement).closest('.post-box');
        if (!postRoot) return;
        const id = postRoot.getAttribute('data-post-id');
        try {
            const responce = await deletePost(id).unwrap();
            dispatch(postSlice.actions.deletePost(Number(id)))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        posts ? 
            <>
                {posts.map((post) => 
                    <Post 
                        key={post.id}
                        postId={post.id}
                        contentText={post.content} 
                        contentImage={getImageUrl(post.image)} 
                        navigateTo={RoutePaths.POST_PAGE_WITH_ID}
                        dropupItems={isOwner ? ownerDropupItems : guestDropupItems}
                        createdAt={post.createdAt}
                    />
                ).reverse()}
                <ModalWindow active={editModalActive} setActive={setEditModalActive} controls={false}>
                    {updatePostInfo && <PostUpdateForm 
                        postId={updatePostInfo.id} 
                        content={updatePostInfo.content} 
                        image={getImageUrl(updatePostInfo.image)} 
                        isCommentable={updatePostInfo.is_commentable}
                        setShowModal={setEditModalActive}
                    />}
                </ModalWindow>
            </>
            : <div>Здесь постов еще нет</div>
    );
};

export {UserPosts};