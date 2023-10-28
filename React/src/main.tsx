import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './index.css'; // Please import this of you want tailwindcss to work

/*
 * All Librabies used: React, router, redux, interceptor
 * */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* Integrate DOM router into app*/}
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
