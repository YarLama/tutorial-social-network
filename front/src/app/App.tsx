import React from 'react';
import { Button } from '../UI';
import './global_styles/_global.scss'


const App: React.FC = () => {
    return (
        <div>
            <Button content='App button' type='s'/>
            <Button content='kek' type='l'/>
            <Button content='Registration'/>
            <Button content='Login 12353'/>
        </div>
    );
};

export default App;