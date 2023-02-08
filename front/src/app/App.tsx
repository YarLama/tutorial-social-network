import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/UI/useWindowSize';
import { Button } from '../UI';
import './global_styles/_global.scss';


const App: React.FC = () => {

    const w = useWindowSize();

    return (
        <div>
            <Button content='Find' type='s'/><br/>
            {w.width > 768 && <Button content='Message' type='s'/>}<br/>
            <Button content='Send Message' type='l'/><br/>
            <Button content='Add to contact' type='l'/><br/>
            <Button content='Registration' type='m'/><br/>
            <Button content='Login' type='m'/>
        </div>
    );
};

export default App;