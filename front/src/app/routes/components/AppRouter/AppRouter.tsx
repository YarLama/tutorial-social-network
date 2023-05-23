import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { NavBar } from '../../../../components';
import { RoutePaths } from '../../constants/routePaths';
import { privateRoutes, publicRoutes } from '../../constants/routes';
import './styles/style.scss'

interface IAppRouterProps {
    isAuthorizate: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({isAuthorizate = false}) => {

    const rootElement = isAuthorizate ? <Navigate to={RoutePaths.TEST_PAGE}/> : <Navigate to={RoutePaths.LOGIN_PAGE}/> ;

    return (
        <div className='network-content'>
            {isAuthorizate && <div className='navbar'><NavBar /></div>}
            <div className={`content ${isAuthorizate ? 'page-block' : ''}`}>
                <Routes>
                {isAuthorizate 
                ? privateRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />}/> ) 
                : publicRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />}/> )}
                <Route path={RoutePaths.ROOT} element={rootElement}/>
                <Route path='*' element={<Navigate to={RoutePaths.ROOT}/>}/>
            </Routes>
            </div>
        </div>
    );
};

export {AppRouter};