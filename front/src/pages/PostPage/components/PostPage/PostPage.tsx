import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../../app/api/postApi';
import { useAppSelector } from '../../../../app/hooks/redux/redux';
import { LoaderRing } from '../../../../UI';
import { PostCommentForm } from '../PostCommentForm/PostCommentForm';
import PostComments from '../PostComments/PostComments';
import PostInfo from '../PostInfo/PostInfo';
import PostMissing from '../PostMissing/PostMissing';
import './styles/style.scss'

const PostPage = () => {

    const { id: paramId } = useParams();
    const { data, isLoading, refetch} = useGetPostQuery(paramId);
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
                        <div className='post-page-form'><PostCommentForm /></div>
                        <PostComments id={data.id} />
                    </>
                :  <PostMissing />
            : <LoaderRing />}
        </div>
    );
};

export {PostPage};