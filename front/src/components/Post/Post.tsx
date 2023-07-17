import React from 'react';
import { getDate } from '../../app/helpers/common/time';
import { PostImage } from '../../app/helpers/types/common';
import { DropupItem } from '../../app/helpers/types/ui';
import { IconButton } from '../../UI';
import './styles/style.scss'

interface IPostProps {
    postId: number;
    contentText?: string;
    contentImage?: PostImage | null;
    dropupItems?: DropupItem[];
    createdAt: string;
    countLikes: number | undefined;
    countComments: number | undefined;
}

const Post: React.FC<IPostProps> = ({ postId, contentText, contentImage, dropupItems, createdAt, countLikes = 0, countComments = 0}) => {

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
                    <div className='post-content-text'>
                        {contentText}
                    </div>
                    : null
                }
                {contentImage ?
                    <div className='post-content-image'>
                        <img src={contentImage.src} alt={contentImage.alt}/>
                    </div>
                    : null
                }
            </div>
            <div className='post-info'>
                <div className='post-info-date'>{getDate(createdAt)}</div>
                <div className='post-info-likes'>
                    <IconButton icon='like' size='s'/>
                    {countLikes}
                </div>
                <div className='post-info-comments'>
                    <IconButton icon='comment' size='s'/>
                    {countComments}
                </div>
            </div>
        </div>
    );
};

export {Post};