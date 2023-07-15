import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { DropupItem } from '../../../../app/helpers/types/ui';
import { ModalWindow, Post } from '../../../../components';
import { PostForm } from '../../../../modules/PostForm';
import { PostUpdateForm } from '../../../../modules/PostUpdateForm';

interface IUserPostsProps {
    isOwner: boolean;
}

const UserPosts: React.FC<IUserPostsProps> = ({isOwner = true}) => {
    
    const s = 'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'
    const s1 = 'https://avatars.mds.yandex.net/i?id=a859c5b1c3415096eaf48b9661aaa2696cfde1ce-8209975-images-thumbs&n=13';
    const s2 = 'https://img1.akspic.ru/crops/8/3/8/6/6/166838/166838-battlefield_2042-battlefield_2042_obzor-kosti-electronic_arts-shuter-3840x2160.jpg';
    const s3 = 'https://w.forfun.com/fetch/85/85752d41628c834b3c0501156b38c877.jpeg?w=1470&r=0.5625';
    const f = 'https://api.slingacademy.com/public/sample-photos/1.jpeg';
    const f1 = 'https://api.slingacademy.com/public/sample-photos/2.jpeg';

    // axios.get(f, {responseType: "blob"}).then(responce => {
    //     console.log(responce.data)
    //     let file = new File([responce.data], 'test.jpg', {type: 'image/jpeg'})
    //     console.log(file)
    // }).catch(err => console.log(err));

    const [editModalActive, setEditModalActive] = useState<boolean>(false);

    const ownerDropupItems : DropupItem[] = [
        {label: 'Edit', onClick: () => setEditModalActive(true)},
        {label: 'Delete', onClick: () => console.log('DELETE CLICK')}
    ]

    const guestDropupItems : DropupItem[] = [
        {label: 'Share', onClick: () => console.log('SHARE CLICK')},
    ]

    const testPosts = [
        { id: 1, content: 'Текст к посту', image: {src:f, alt:'kek'}, countLikes: 15, countComments: 1},
        { id: 2, content: '', image: {src:f1, alt:'kek2'}},
        { id: 3, content: '', image: {src:f, alt:'kek2'}, countLikes: 3},
        { id: 4, content: '', image: {src:f1, alt:'kek2'}, countLikes: 48, countComments: 4},
        { id: 5, content: 'Пытаеюсь фыв фыв фывфыыыыыы фыв фывф ывфыыЛЛАЛАаааа афывфывфывфывфы фывфывфыыыыыывфы вфывфывфывфыв', countLikes: 1, countComments: 2},
    ];

    return (
        testPosts ? 
            <>
                {testPosts.map((post) => 
                    <Fragment key={post.id}>
                        <Post 
                            contentText={post.content} 
                            contentImage={post.image} 
                            dropupItems={isOwner ? ownerDropupItems : guestDropupItems}
                            createdAt={"2023-07-15T02:47:36.316Z"}
                            countLikes={post.countLikes}
                            countComments={post.countComments}
                        />
                        <ModalWindow active={editModalActive} setActive={setEditModalActive}>
                            <PostUpdateForm postId={post.id} content={post.content} image={post.image?.src} isCommentable={true}/>
                        </ModalWindow>
                    </Fragment>
                )}
            </>
            : null
    );
};

export {UserPosts};