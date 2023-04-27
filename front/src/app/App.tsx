import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './global_styles/_global.scss';
import { AppRouter } from './routes';


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <>
                <AppRouter isAuthorizate={true}/>
            </> 
        </BrowserRouter>
            
    );
};

export default App;