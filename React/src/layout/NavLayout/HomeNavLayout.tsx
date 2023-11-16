import React from 'react';
import SideBar from '../../components/SidebarRecursive/SideBar';
import MiniSideNavMenu from '../../components/MiniSideNavMenu/MiniSideNavMenu.tsx';
import {Outlet, useNavigate} from 'react-router-dom';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import Footer from '../../components/Footer/footer.tsx';

const HomeNavLayout = () => {
    const navigate = useNavigate();
    const createPostPath = window.location.pathname + 'createNewPost';
    const {validateIsAdmin} = useAuthoriser();

    return (
        <>
            <nav className="grid grid-cols-5 gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-3 relative">
                    <Outlet></Outlet>
                </div>
                <div className="col-span-1">{validateIsAdmin() ? <MiniSideNavMenu onClickPost={() => navigate(createPostPath)} /> : null}</div>
            </nav>
            <Footer></Footer>
        </>
    );
};

export default HomeNavLayout;
