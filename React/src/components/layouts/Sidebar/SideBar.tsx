import React from 'react';
import {Link, Outlet} from 'react-router-dom';
/*
 * For this to exist along side every other component, you have to use an outlet
 * */
const SideBar = () => {
    return (
        <>
            This is a sidebar
            <Outlet></Outlet>
        </>
    );
};

export default SideBar;
