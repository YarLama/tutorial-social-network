import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { replaceWithId } from '../../app/helpers/http';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux/redux';
import { useWindowSize } from '../../app/hooks/UI/useWindowSize';
import { RoutePaths } from '../../app/routes/constants/routePaths';
import { authSlice } from '../../app/store/reducers/AuthSlice';
import { IconButton } from '../../UI';
import './styles/style.scss'



const NavBar: React.FC = () => {

    const dispatch = useAppDispatch();
    const { isMobile } = useWindowSize();
    const { id } = useAppSelector(state => state.authReducer.user);
    const navigate = useNavigate();
    const [active, setActive] = useState<boolean>(false);

    const handleBurgerClick = () => {
        setActive(!active);
    }

    const handleClickLogout = () => {
        dispatch(authSlice.actions.logout());
    }

    const handleClicProfile = () => {
        navigate(replaceWithId(RoutePaths.USER_PAGE_WITH_ID, id));
    }

    const handleClickMessages = () => {
        console.log('navigate to Messages')
    }

    const handleClickContacts = () => {
        console.log('navigate to Contacts')
    }


    return (
        <>
            { !isMobile 
                ?   
                <div className='navbar-items'>
                    <div className='navbar-item' onClick={handleClicProfile}><IconButton icon='profile' /></div>
                    <div className='navbar-item' onClick={handleClickMessages}><IconButton icon='chat' /></div>
                    <div className='navbar-item' onClick={handleClickContacts}><IconButton icon='contact' /></div>
                    <div className='navbar-item' onClick={handleClickLogout}><IconButton icon='logout'/></div>
                </div>
                :
                <>
                    <div className='burger-icon' onClick={handleBurgerClick}>
                        <span></span>
                    </div>
                    { active
                        ?
                        <> 
                            <div className='navbar-items'>
                                <div className='navbar-item' onClick={handleClicProfile}>
                                    <IconButton size='s' icon='profile' />
                                    <span className='navbar-item-label'>Profile</span>
                                </div>
                                <div className='navbar-item' onClick={handleClickMessages}>
                                    <IconButton size='s' icon='chat' />
                                    <span className='navbar-item-label'>Messages</span>
                                </div>
                                <div className='navbar-item' onClick={handleClickContacts}>
                                    <IconButton size='s' icon='contact' />
                                    <span className='navbar-item-label'>Contacts</span>
                                </div>
                                <div className='navbar-item' onClick={handleClickLogout}>
                                    <IconButton size='s' icon='logout'/>
                                    <span className='navbar-item-label'>Log out</span>
                                </div>
                            </div>
                            <div className='navbar-blur' onClick={() => setActive(false)}></div>
                        </>
                        : null
                    }
                    
                </>
            }
            
        </>
    )
};

export {NavBar};