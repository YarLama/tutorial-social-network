import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/UI/useWindowSize';
import { Button, IconButton } from '../UI';
import './global_styles/_global.scss';


const App: React.FC = () => {

    const w = useWindowSize();
    const isMobile: boolean = w.width < 768;

    return (
        <div>
            <IconButton icon='send' type='l'/><IconButton icon='send'/><IconButton icon='send' type='s'/><br />
            <IconButton icon='left' type='l'/><IconButton icon='left'/><IconButton icon='left' type='s'/><br />
            <IconButton icon='edit' type='l'/><IconButton icon='edit'/><IconButton icon='edit' type='s'/><br />
            <IconButton icon='cancel' type='l'/><IconButton icon='cancel'/><IconButton icon='cancel' type='s'/><br />
            <IconButton icon='comment' type='l'/><IconButton icon='comment'/><IconButton icon='comment' type='s'/><br />
            <IconButton icon='like' type='l'/><IconButton icon='like'/><IconButton icon='like' type='s'/><br />
            <IconButton icon='about' type='l'/><IconButton icon='about'/><IconButton icon='about' type='s'/><br />
            <IconButton icon='logout' type='l'/><IconButton icon='logout'/><IconButton icon='logout' type='s'/><br />
            <IconButton icon='profile' type='l'/><IconButton icon='profile'/><IconButton icon='profile' type='s'/><br />
            <IconButton icon='attach' type='l'/><IconButton icon='attach'/><IconButton icon='attach' type='s'/><br />
            <IconButton icon='contact' type='l'/><IconButton icon='contact'/><IconButton icon='contact' type='s'/><br />
            <IconButton icon='chat' type='l'/><IconButton icon='chat'/><IconButton icon='chat' type='s'/><br />
            <Button content='Find' type='s'/><br/>
            <Button content='Message' type='s' disabled={isMobile}/><br/>
            <Button content='Send Message' type='l'/><br/>
            <Button content='Add to contact' type='l'/><br/>
            <Button content='Registration' type='m'/><br/>
            <Button content='Login' type='m'/><br/>
            
        </div>
    );
};

export default App;