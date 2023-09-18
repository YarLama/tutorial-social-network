import React from 'react';
import { useGetPostCommentsQuery } from '../../../../app/api/commentApi';
import { LoaderRing } from '../../../../UI';
import PostComment from '../PostComment/PostComment';

interface IPostCommentsProps {
    id: number;
}

const PostComments: React.FC<IPostCommentsProps> = ({id}) => {
    
    const { data, isLoading } = useGetPostCommentsQuery(id);

    return (
        !isLoading ?
            data && data.length > 0 ?
                <>
                {data.map(comment => <PostComment key={comment.id} id={comment.id} ownerId={comment.userId} content={comment.content} createdAt={comment.createdAt}/>)}
                </>
            : <div style={{'color': 'white', 'fontSize': '16pt'}}>
                Comments not found
            </div>
        : <LoaderRing />
    );
};

export default PostComments;