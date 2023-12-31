import {Link, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SideBar from './components/SidebarRecursive/SideBar';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import ReferencePage from './pages/ReferencePage/ReferencePage';
import SignupPage from './pages/SignupPage/SignupPage';
import React from 'react';
import PostContainer from './components/PostContainer/PostContainer.tsx';
import CreatePost from './components/Post/CreatePost.tsx';
import ReferenceNavLayout from './layout/NavLayout/ReferenceNavLayout.tsx';
import HomeNavLayout from './layout/NavLayout/HomeNavLayout.tsx';
import Settings from './components/Settings/Settings.tsx';
import SettingsNavLayout from './layout/NavLayout/SettingsNavLayout.tsx';

function App() {
    /*
     * Nesting components in all child routes
     *
     * Note that the component that exist in all routes will have state that persist across all routes,
     * if you want to reload the thing everytime, this is not the way
     * */
    return (
        <>
            <Routes>
                <Route element={<NavBar></NavBar>}>
                    <Route path="/" element={<HomeNavLayout />}>
                        <Route index element={<HomePage />}></Route>
                        <Route path="/createNewPost" element={<CreatePost></CreatePost>}></Route>
                    </Route>

                    <Route path="/reference" element={<ReferenceNavLayout />}>
                        <Route index element={<ReferencePage />}></Route>
                        <Route path="/reference/createNewPost" element={<CreatePost></CreatePost>}></Route>
                        <Route path="/reference/:parentTab">
                            <Route path="/reference/:parentTab/:childTab/createNewPost" element={<CreatePost></CreatePost>}></Route>
                            <Route path="/reference/:parentTab/:childTab" element={<PostContainer />}></Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/settings" element={<SettingsNavLayout />}>
                        <Route index element={<Settings />}></Route>
                    </Route>
                    <Route path="/*" element={<NotFoundPage />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
