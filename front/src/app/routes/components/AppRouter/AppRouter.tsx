import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RoutePaths } from '../../constants/routePaths';
import { privateRoutes, publicRoutes } from '../../constants/routes';

interface IAppRouterProps {
    isAuthorizate: boolean;
}

const AppRouter: React.FC<IAppRouterProps> = ({isAuthorizate = false}) => {

    const routes = isAuthorizate ? publicRoutes : privateRoutes;
    const rootElement = isAuthorizate ? <Navigate to={RoutePaths.TEST_PAGE}/> : <Navigate to={RoutePaths.LOGIN_PAGE}/> ;
    console.log(routes[0].path, routes[0].element)

    return (
        <Routes>
            <Route path={RoutePaths.ROOT} element={rootElement}/>
            {routes.map((route, index) => 
                <Route key={index} path={route.path} element={<route.element />}/>   
            )}
            {/* <Route path='/*' element={<Navigate to={RoutePaths.ROOT}/>}/> */}
        </Routes>
    );
};

export {AppRouter};