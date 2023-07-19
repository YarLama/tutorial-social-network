import axios from 'axios';
import React, { Fragment, MouseEvent, useState } from 'react';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { ModalWindow, Post } from '../../../../components';
import { PostUpdateForm } from '../../../../modules/PostUpdateForm';

interface IUserPostsProps {
    isOwner: boolean;
}

type TestLocalPost = { id: number, content: string, imageSrc : string | undefined}

const UserPosts: React.FC<IUserPostsProps> = ({isOwner = true}) => {
    
    const s = 'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'
    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
    const s2 = 'https://img1.akspic.ru/crops/8/3/8/6/6/166838/166838-battlefield_2042-battlefield_2042_obzor-kosti-electronic_arts-shuter-3840x2160.jpg';
    const s3 = 'https://w.forfun.com/fetch/85/85752d41628c834b3c0501156b38c877.jpeg?w=1470&r=0.5625';
    const f = 'https://api.slingacademy.com/public/sample-photos/1.jpeg';
    const f1 = 'https://api.slingacademy.com/public/sample-photos/2.jpeg';

    const [editModalActive, setEditModalActive] = useState<boolean>(false);
    const [updatePostInfo, setUpdatePostInfo] = useState<TestLocalPost | null>();

    const ownerDropupItems : DropupItem[] = [
        {label: 'Edit', onClick: (e) => handleUpdatePostInfo(e)},
        {label: 'Delete', onClick: () => console.log('DELETE CLICK')}
    ]

    const guestDropupItems : DropupItem[] = [
        {label: 'Share', onClick: () => console.log('SHARE CLICK')},
    ]

    const testPosts = [
        { id: 1, content: 'Текст к посту', image: {src:f1, alt:'kek'}, countLikes: 15, countComments: 1},
        { id: 2, content: '', image: {src:s1, alt:'kek2'}},
        { id: 3, content: '', image: {src:s, alt:'kek2'}, countLikes: 3},
        { id: 4, content: '', image: {src:s3, alt:'kek2'}, countLikes: 48, countComments: 4},
        { id: 5, content: 'Пытаеюсь фыв фыв фывфыыыыыы фыв фывф ывфыыЛЛАЛАаааа афывфывфывфывфы фывфывфыыыыыывфы вфывфывфывфыв', countLikes: 1, countComments: 2},
    ];

    const handleUpdatePostInfo = (e: MouseEvent) => {
        const postRoot = (e.target as HTMLElement).closest('.post-box');
        if (!postRoot) return;
        const id = postRoot.getAttribute('data-post-id');
        const post = testPosts.find(post => post.id === Number(id));
        if (!post) return;
        let testPostInfo: TestLocalPost = { id: post?.id, content: post?.content, imageSrc: post?.image?.src}
        setUpdatePostInfo(testPostInfo)
        setEditModalActive(true);
    }
    

    return (
        testPosts ? 
            <>
                {testPosts.map((post) => 
                    <Post 
                        key={post.id}
                        postId={post.id}
                        contentText={post.content} 
                        contentImage={post.image} 
                        dropupItems={isOwner ? ownerDropupItems : guestDropupItems}
                        createdAt={"2023-07-15T02:47:36.316Z"}
                        countLikes={post.countLikes}
                        countComments={post.countComments}
                    />
                )}
                <ModalWindow active={editModalActive} setActive={setEditModalActive} controls={false}>
                    {updatePostInfo && <PostUpdateForm postId={updatePostInfo.id} content={updatePostInfo.content} image={updatePostInfo.imageSrc} isCommentable={false}/>}
                </ModalWindow>
            </>
            : null
    );
};

export {UserPosts};