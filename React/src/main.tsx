import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './index.css'; // Please import this of you want tailwindcss to work
import '@mantine/core/styles.css';
import {MantineProvider, createTheme} from '@mantine/core';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

/*
 * All Libraries used: React, router, redux, interceptor
 * */
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* Redux */}
        <Provider store={store}>
            <BrowserRouter>
                {/* Mantine Component library*/}
                <MantineProvider theme={theme}>
                    {/*Tanstack - react query lib*/}
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </MantineProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
