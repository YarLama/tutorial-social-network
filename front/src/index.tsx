import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/App';
import { setupStore } from './app/store/store';


const store = setupStore();
const rootNode = document.getElementById('app');
if (rootNode) {
    createRoot(rootNode).render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}