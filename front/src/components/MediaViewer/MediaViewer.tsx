import React, { Dispatch, SetStateAction, useState } from 'react';
import { IconButton } from '../../UI';
import './styles/style.scss';
import testPhoto1 from './test/1.jpg';
import testPhoto2 from './test/2.jpg';

interface IMediaViewerProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const MediaViewer: React.FC<IMediaViewerProps> = ({
    active = false,
    setActive
}) => {

    const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0)
    const [mediaTouched, setMediaTouched] = useState<boolean>(false);

    const ch = [
        <img src={testPhoto1} />,
        <img src={testPhoto2} />,
        <img src='https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'/>,
        <img src='https://images.unsplash.com/photo-1535083988052-565ca9546643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'/>
    ]

    const handleMediaViewerClose = () => {
        setActive(false)
    }

    const handleToNextMedia = () => {
        if (ch.length - 1 === currentMediaIndex) return
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
        active 
            ?
            <>
                <div className='media-viewer'>
                    <div 
                        className='media-viewer-content' 
                        onMouseOver={handleMouseOverMediaTouched} 
                        onMouseOut={handleMouseOutMediaTouched}
                    >
                        <div className={`media-viewer-switcher media-viewer-switcher-left${mediaTouched ? ' active' : ''}`} onClick={handleToPreviousMedia} >
                            <IconButton icon='left' size='m' />
                        </div>
                        <div 
                            className='media-viewer-current-media' 
                            onClick={handleMediaViewerClose}
                        >
                            {ch[currentMediaIndex]}
                        </div>
                        <div className={`media-viewer-switcher media-viewer-switcher-right${mediaTouched ? ' active' : ''}`} onClick={handleToNextMedia}>
                            <IconButton icon='right' size='m' />
                        </div> 
                    </div>
                    <div className='media-viewer-preview' style={{'color': 'white'}}>
                        <span>
                            {`${currentMediaIndex + 1}/${ch.length}`}
                        </span>
                        <span>
                            Сделать аватаркой
                        </span>
                    </div>
                </div>
            </>
            : null
    );
};

export default MediaViewer;