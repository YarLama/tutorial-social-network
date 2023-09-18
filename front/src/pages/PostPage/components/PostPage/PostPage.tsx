import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../../app/api/postApi';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { LoaderRing } from '../../../../UI';
import PostComments from '../PostComments/PostComments';
import PostInfo from '../PostInfo/PostInfo';
import PostMissing from '../PostMissing/PostMissing';

const PostPage = () => {

    const { id } = useParams();
    const { data, isLoading, refetch} = useGetPostQuery(id);
    const location = useLocation();
    const { posts } = useAppSelector(state => state.postReducer);

    useEffect(() => {
        refetch();
    }, [location, posts])

    return (
        <div className='post-page'>
            {!isLoading ?
                data ? 
                    <>
                        <PostInfo post={data}/>
                        <PostComments id={data.id}/>
                    </>
                :  <PostMissing />
            : <LoaderRing />}
        </div>
    );
};

export {PostPage};