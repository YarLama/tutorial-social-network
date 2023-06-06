import React from 'react';
import { useWindowSize } from '../../../../app/hooks/UI/useWindowSize';
import { LoaderBlock } from '../../../../UI';
import './styles/style.scss'

const UserPageLoading = () => {

    const { isMobile } = useWindowSize();

    return (
        <div className='user-loader'>
            <div className='info-block'>
                <LoaderBlock extraClassName='loader-avatar' color='minor'/>
                <LoaderBlock extraClassName='loader-info' color='minor'/>
            </div>
            <div className='toolkit-block'>
                <div className='btn-block'>
                    <LoaderBlock extraClassName='loader-button1' color='minor'/>
                    <LoaderBlock extraClassName='loader-button2' color='minor'/>
                </div>
                { !isMobile && <LoaderBlock extraClassName='loader-post-create' color='minor'/>}
            </div>
            <div className='posts-block'>
                <LoaderBlock extraClassName='loader-post' color='minor'/>
            </div>
        </div>
    );
};

export default UserPageLoading;