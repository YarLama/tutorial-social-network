import React from 'react';
import { PostImage } from '../../app/helpers/types/common';
import { IconButton } from '../../UI';
import './styles/style.scss'

interface IPostProps {
    isOwnersPost?: boolean;
    contentText?: string;
    contentImage?: PostImage | null;
}

const Post: React.FC<IPostProps> = ({isOwnersPost = true , contentText, contentImage}) => {

    return (
        <div className='post-box'>
            <div className='post-toolkit'>
                <span className='post-toolkit-detail'>
                    <div className='detail-drowup'>
                        {isOwnersPost ?
                            <>
                                <span className='drowup-element' >Edit</span>
                                <span className='drowup-element' >Delete</span>
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
                <div className='post-info-date'>11.04.2023 22:53</div>
                <div className='post-info-likes'>
                    <IconButton icon='like' size='s'/>
                    234
                </div>
                <div className='post-info-comments'>
                    <IconButton icon='comment' size='s'/>
                    3
                </div>
            </div>
        </div>
    );
};

export {Post};