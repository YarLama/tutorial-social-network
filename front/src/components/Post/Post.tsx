import React from 'react';
import { useNavigate } from 'react-router-dom';
import { commentApi } from '../../app/api/commentApi';
import { likeApi } from '../../app/api/likeApi';
import { getDate } from '../../app/helpers/common/time';
import { replaceWithId } from '../../app/helpers/http';
import { DropupItem } from '../../app/helpers/types/ui';
import { IconButton } from '../../UI';
import './styles/style.scss'

interface IPostProps {
    postId: number;
    createdAt: string;
    contentText?: string;
    contentImage?: string | null;
    navigateTo?: string;
    dropupItems?: DropupItem[];
    handleImageClick?: () => void;
}

const Post: React.FC<IPostProps> = ({ postId, contentText, contentImage, navigateTo, dropupItems, createdAt, handleImageClick = () => null }) => {

    const {data: postLikesInfo} = likeApi.useGetPostLikesInfoQuery(postId);
    const {data: postCommentsInfo, error} = commentApi.useGetPostCommentsInfoQuery(postId);
    const navigate = useNavigate();

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
            <div className='post-content' onClick={navigateTo ? () => navigate(replaceWithId(navigateTo, postId)) : undefined}>
                {contentText ?
                    <div className='post-content-text'> {contentText} </div>
                    : null
                }
                {contentImage ?
                    <div className='post-content-image' onClick={handleImageClick}> <img src={contentImage} /> </div>
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