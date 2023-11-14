import {Link, Outlet, useParams} from 'react-router-dom';
import LoginNavBar from '../LoginNavBar/LoginNavBar.tsx';
import React, {useEffect, useState} from 'react';
import {FaReact} from 'react-icons/fa';

/*We are not going to dynamically load the navbar items as an array as there is no need for it.
 * It complicates the structure as well
 *
 * Include icon at the top left hand corner
 * Include the navbar items at the top right hand corner
 * */
const navBarItems = [
    {name: 'Home', path: '/'},
    {name: 'Reference', path: '/reference'}
];
const NavBar = () => {
    return (
        <>
            <nav className="w-full p-2 mx-auto flex justify-center gap-20 text-xl font-medium color text-slate-600">
                <span className="text-blue-500">
                    <Link to="/">
                        <FaReact size={30} />
                    </Link>
                </span>
                {navBarItems.map((item, index) => {
                    return (
                        <Link
                            to={item.path}
                            className="relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                            key={index}
                        >
                            <span className="flex justify-center gap-1">{item.name}</span>
                        </Link>
                    );
                })}
                <LoginNavBar></LoginNavBar>
            </nav>

            {/*Do not remove this*/}
            <Outlet></Outlet>
        </>
    );
};

export default NavBar;
