import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/UI/useWindowSize';
import { Button, IconButton } from '../UI';
import './global_styles/_global.scss';


const App: React.FC = () => {

    const w = useWindowSize();
    const isMobile: boolean = w.width < 768;

    return (
        <div>
            <Button content='Find' type='s'/><br/>
            <Button content='Message' type='s' disabled={isMobile}/><br/>
            <Button content='Send Message' type='l'/><br/>
            <Button content='Add to contact' type='l'/><br/>
            <Button content='Registration' type='m'/><br/>
            <Button content='Login' type='m'/><br/>
            <IconButton icon='send'/><br/>
            <IconButton icon='send' type='s'/><br/>
            <IconButton icon='left'/><br/>
            <IconButton icon='edit' type='s'/><br/>
        </div>
    );
};

export default App;