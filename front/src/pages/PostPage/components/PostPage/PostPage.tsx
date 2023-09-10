import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../../app/api/postApi';
import { LoaderRing } from '../../../../UI';
import PostComments from '../PostComments/PostComments';
import PostInfo from '../PostInfo/PostInfo';
import PostMissing from '../PostMissing/PostMissing';

const PostPage = () => {

    const { id } = useParams();
    const { data, isLoading} = useGetPostQuery(id);

    return (
        <div className='post-page'>
            {!isLoading ?
                data ? 
                    <>
                        <PostInfo post={data}/>
                        <PostComments />
                    </>
                :  <PostMissing />
            : <LoaderRing />}
        </div>
    );
};

export {PostPage};