import React from 'react';
import { Button } from '../UI';
import './global_styles/_global.scss'


const App: React.FC = () => {
    return (
        <div>
            <Button content='App button'/>
            <Button content='kek'/>
            <Button content='Registration'/>
            <Button content='Login'/>
        </div>
    );
};

export default App;