import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RoutePaths } from '../../constants/routePaths';
import { privateRoutes, publicRoutes } from '../../constants/routes';

interface IAppRouterProps {
    isAuthorizate: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({isAuthorizate = false}) => {

    const routes = isAuthorizate ? privateRoutes : publicRoutes;
    const rootElement = isAuthorizate ? <Navigate to={RoutePaths.TEST_PAGE}/> : <Navigate to={RoutePaths.LOGIN_PAGE}/> ;
    console.log(routes[0].path, routes[0].element)

    return (
        <Routes>
            {publicRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />}/> )}
            {isAuthorizate ? privateRoutes.map((route) => <Route key={route.path} path={route.path} element={<route.element />}/> ) : null}
            <Route path={RoutePaths.ROOT} element={rootElement}/>
            <Route path='*' element={<Navigate to={RoutePaths.ROOT}/>}/>
        </Routes>
    );
};

export {AppRouter};