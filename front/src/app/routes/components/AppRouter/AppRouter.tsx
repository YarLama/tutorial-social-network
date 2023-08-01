import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { NavBar } from '../../../../components';
import { replaceWithId } from '../../../helpers/http';
import { useAppSelector } from '../../../hooks/redux/redux';
import { RoutePaths } from '../../constants/routePaths';
import { privateRoutes, publicRoutes } from '../../constants/routes';
import './styles/style.scss'

interface IAppRouterProps {
    isAuthorizate: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({isAuthorizate = false}) => {


    const { id } = useAppSelector(state => state.authReducer.authUserInfo);
    const userPage = replaceWithId(RoutePaths.USER_PAGE_WITH_ID, id);
    const rootElement = isAuthorizate ? <Navigate to={userPage}/> : <Navigate to={RoutePaths.LOGIN_PAGE}/> ;

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