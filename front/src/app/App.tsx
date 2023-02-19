import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/UI/useWindowSize';
import { Button, IconButton } from '../UI';
import { ModalWindow } from '../components';
import './global_styles/_global.scss';


const App: React.FC = () => {

    const [testModalActive, setTestModalActive] = useState<boolean>(true);
    const w = useWindowSize();
    const isMobile: boolean = w.width < 768;

    function kek() {
        setTestModalActive(true)
    }

    return (
        <div>
            <Button content='Open Modal' type='s' onClick={kek}/><br/>
            <ModalWindow active={testModalActive} setActive={setTestModalActive}>
                Хуй<br/>
                <IconButton icon='send' type='l'/><IconButton icon='send'/><IconButton icon='send' type='s'/><IconButton icon='send' type='xs'/><br />
                <Button content='Login' type='m'/><br/>
            </ModalWindow>
            <IconButton icon='send' type='l'/><IconButton icon='send'/><IconButton icon='send' type='s'/><IconButton icon='send' type='xs'/><br />
            <IconButton icon='left' type='l'/><IconButton icon='left'/><IconButton icon='left' type='s'/><IconButton icon='left' type='xs'/><br />
            <IconButton icon='edit' type='l'/><IconButton icon='edit'/><IconButton icon='edit' type='s'/><IconButton icon='edit' type='xs'/><br />
            <IconButton icon='cancel' type='l'/><IconButton icon='cancel'/><IconButton icon='cancel' type='s'/><IconButton icon='cancel' type='xs'/><br />
            <IconButton icon='comment' type='l'/><IconButton icon='comment'/><IconButton icon='comment' type='s'/><IconButton icon='comment' type='xs'/><br />
            <IconButton icon='like' type='l'/><IconButton icon='like'/><IconButton icon='like' type='s'/><IconButton icon='like' type='xs'/><br />
            <IconButton icon='about' type='l'/><IconButton icon='about'/><IconButton icon='about' type='s'/><IconButton icon='about' type='xs'/><br />
            <IconButton icon='logout' type='l'/><IconButton icon='logout'/><IconButton icon='logout' type='s'/><IconButton icon='logout' type='xs'/><br />
            <IconButton icon='profile' type='l'/><IconButton icon='profile'/><IconButton icon='profile' type='s'/><IconButton icon='profile' type='xs'/><br />
            <IconButton icon='attach' type='l'/><IconButton icon='attach'/><IconButton icon='attach' type='s'/><IconButton icon='attach' type='xs'/><br />
            <IconButton icon='contact' type='l'/><IconButton icon='contact'/><IconButton icon='contact' type='s'/><IconButton icon='contact' type='xs'/><br />
            <IconButton icon='chat' type='l'/><IconButton icon='chat'/><IconButton icon='chat' type='s'/><IconButton icon='chat' type='xs'/><br />
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