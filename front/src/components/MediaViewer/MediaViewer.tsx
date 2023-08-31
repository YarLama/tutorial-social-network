import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Photo } from '../../app/api/photoApi/types';
import { getImageUrl } from '../../app/helpers/http';
import { DropupItem } from '../../app/helpers/types/ui';
import { IconButton } from '../../UI';
import './styles/style.scss';

interface IMediaViewerProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    elements: Photo[] | null;
    dropupItems?: DropupItem[];
    getCurrentMedia?: Dispatch<SetStateAction<Photo | undefined>>;
}

const MediaViewer: React.FC<IMediaViewerProps> = ({
    active = false,
    setActive,
    elements,
    dropupItems,
    getCurrentMedia
}) => {

    const [media, setMedia] = useState<JSX.Element[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0)
    const [mediaTouched, setMediaTouched] = useState<boolean>(false);

    useEffect(() => {
        if (elements) {
            setMedia(elements.map(element => {
                return <img key={element.id} src={getImageUrl(element.image)} alt={element.image}/>
            }));
        }
    },[elements])

    useEffect(() => {
        setCurrentMediaIndex(0);
    }, [active])

    useEffect(() => {
        if (elements && !!getCurrentMedia) {
            const media = elements[currentMediaIndex]
            getCurrentMedia(media);
        }
    }, [currentMediaIndex])

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
                                {dropupItems ?
                                    <>
                                        {dropupItems.map((el, index) => <span className='dropup-element' key={index} onClick={el.onClick}>{el.label}</span>)}
                                    </>
                                : null}
                            </div>
                        </span>
                    </div>
                </div>
            </>
            : null
    );
};

export {MediaViewer, type IMediaViewerProps};