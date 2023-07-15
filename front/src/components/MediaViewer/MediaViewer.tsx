import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserImage } from '../../app/helpers/types/common';
import { IconButton } from '../../UI';
import './styles/style.scss';

interface IMediaViewerProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    elements: UserImage[];
}

const MediaViewer: React.FC<IMediaViewerProps> = ({
    active = false,
    setActive,
    elements
}) => {

    const [media, setMedia] = useState<JSX.Element[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0)
    const [mediaTouched, setMediaTouched] = useState<boolean>(false);

    useEffect(() => {
        setMedia(elements.map(element => {
            return <img key={element.id} src={element.src} alt={element.alt}/>
        }))
    },[])

    const handleMediaViewerClose = () => {
        setActive(false)
    }

    const handleToNextMedia = () => {
        if (media.length - 1 === currentMediaIndex) return
        setCurrentMediaIndex(currentMediaIndex + 1)
    }

    const handleToPreviousMedia = () => {
        if (currentMediaIndex === 0) return
        setCurrentMediaIndex(currentMediaIndex - 1)
    }

    const hanldeDeletePhoto = () => {
        const test = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Типа сообщение удалении фото');
            }, 2000);
        })

        test.then((value) => {
            console.log(value);
            handleMediaViewerClose();
        })
    }

    const handleAvatarSet = () => {
        const test = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Типа делаю фото аватаркой');
            }, 2000);
        })

        test.then((value) => {
            console.log(value);
            handleMediaViewerClose();
        })
    }

    const handleMouseOverMediaTouched = () => {
        setMediaTouched(true);
    }

    const handleMouseOutMediaTouched = () => {
        setMediaTouched(false);
    }

    return (
        active && media.length !== 0
            ?
            <>
                <div className='media-viewer'>
                    <div className='media-viewer-content' onMouseOver={handleMouseOverMediaTouched} onMouseOut={handleMouseOutMediaTouched}>
                        <div className={`media-viewer-switcher media-viewer-switcher-left${mediaTouched ? ' active' : ''}`} onClick={handleToPreviousMedia}>
                            <IconButton icon='left' size='m' />
                        </div>
                        <div className='media-viewer-current-media' onClick={handleMediaViewerClose}>
                            {media[currentMediaIndex]}
                        </div>
                        <div className={`media-viewer-switcher media-viewer-switcher-right${mediaTouched ? ' active' : ''}`} onClick={handleToNextMedia}>
                            <IconButton icon='right' size='m' />
                        </div> 
                    </div>
                    <div className='media-viewer-preview' style={{'color': 'white'}}>
                        <span className='media-viewer-preview-count'>
                            {`${currentMediaIndex + 1}/${media.length}`}
                        </span>
                        <span className='media-viewer-preview-detail'>
                            <div className='detail-dropup'>
                                <span className='dropup-element' onClick={hanldeDeletePhoto}>Delete photo</span>
                                <span className='dropup-element' onClick={handleAvatarSet}>Set as avatar</span>
                            </div>
                        </span>
                    </div>
                </div>
            </>
            : null
    );
};

export {MediaViewer};