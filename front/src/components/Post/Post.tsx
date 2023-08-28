import React from 'react';
import { commentApi } from '../../app/api/commentApi';
import { likeApi } from '../../app/api/likeApi';
import { getDate } from '../../app/helpers/common/time';
import { DropupItem } from '../../app/helpers/types/ui';
import { IconButton } from '../../UI';
import './styles/style.scss'

interface IPostProps {
    postId: number;
    contentText?: string;
    contentImage?: string | null;
    dropupItems?: DropupItem[];
    createdAt: string;
}

const Post: React.FC<IPostProps> = ({ postId, contentText, contentImage, dropupItems, createdAt }) => {

    const {data: postLikesInfo} = likeApi.useGetPostLikesInfoQuery(postId);
    const {data: postCommentsInfo, error} = commentApi.useGetPostCommentsInfoQuery(postId);

    return (
        <div className='post-box' data-post-id={postId}>
            <div className='post-toolkit'>
                <span className='post-toolkit-detail'>
                    <div className='detail-dropup'>
                        {dropupItems ?
                            <>
                                {dropupItems.map((el, index) => <span className='dropup-element' key={index} onClick={el.onClick}>{el.label}</span>)}
                            </>
                            : null
                        }
                    </div>
                </span>
            </div>
            <div className='post-content'>
                {contentText ?
                    <div className='post-content-text'> {contentText} </div>
                    : null
                }
                {contentImage ?
                    <div className='post-content-image'> <img src={contentImage} /> </div>
                    : null
                }
            </div>
            <div className='post-info'>
                <div className='post-info-date'>{getDate(createdAt)}</div>
                <div className='post-info-likes'>
                    <IconButton icon='like' size='s'/>
                    {postLikesInfo?.countLikes || 0}
                </div>
                <div className='post-info-comments'>
                    <IconButton icon='comment' size='s'/>
                    {postCommentsInfo?.countComments || 0}
                </div>
            </div>
        </div>
    );
};

export {Post};