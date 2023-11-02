import {Link, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SideBar from './components/Nav/Sidebar/SideBar';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NavBar from './components/Nav/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import ReferencePage from './pages/ReferencePage/ReferencePage';
import SignupPage from './pages/SignupPage/SignupPage';
import React from 'react';

function App() {
    return (
        <>
            <Routes>
                <Route element={<NavBar></NavBar>}>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/reference" element={<SideBar />}>
                        <Route index element={<ReferencePage />}></Route>
                        <Route path="/reference/:TabsDocumentProps" element={<ReferencePage />}></Route>
                    </Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/*" element={<NotFoundPage />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
