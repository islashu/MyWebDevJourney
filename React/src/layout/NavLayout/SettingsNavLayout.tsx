import React from 'react';
import {Outlet} from 'react-router-dom';
import MiniSideNavMenu from '../../components/MiniSideNavMenu/MiniSideNavMenu.tsx';
import Footer from '../../components/Footer/footer.tsx';

const SettingsNavLayout = () => {
    return (
        <div>
            <nav className="grid grid-cols-5 gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-3 relative">
                    <Outlet></Outlet>
                </div>
                <div className="col-span-1"></div>
            </nav>
            <Footer></Footer>
        </div>
    );
};

export default SettingsNavLayout;
