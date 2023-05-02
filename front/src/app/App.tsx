import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './global_styles/_global.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux/redux';
import { AppRouter } from './routes';
import { checkAuth } from './store/reducers/AuthActionCreators';


const App: React.FC = () => {

    const dispatch = useAppDispatch()
    const { isAuthenticated } = useAppSelector(state => state.authReducer)

    useEffect(() => {
        console.log(isAuthenticated)
        dispatch(checkAuth())
    })

    return (
        <BrowserRouter>
            <>
                <AppRouter isAuthorizate={isAuthenticated}/>
            </> 
        </BrowserRouter> 
    );
};

export default App;