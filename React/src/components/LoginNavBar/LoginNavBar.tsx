import CustomButton from '../CustomComponents/common/CustomButton/CustomButton.tsx';
import {Link} from 'react-router-dom';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service.ts';
import {useHttpAuth} from '../../api/auth/auth.api.ts';
import useAxiosJwt from '../../api/config/interceptor/useAxiosJwt.ts';
import {AuthTOProps} from '../../model/auth.model.ts';
import {Button, Menu} from '@mantine/core';
import CustomAvatar from '../CustomComponents/common/CustomAvatar/CustomAvatar.tsx';
import CustomMenu from '../CustomComponents/common/CustomMenu/CustomMenu.tsx';
import CustomUserNavMenu from '../CustomComponents/CustomUserNavMenu/CustomUserNavMenu.tsx';
import React from 'react';

const loginNavBarItems = [
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'Sign up',
        path: '/signup'
    }
];
const LoginNavBar = () => {
    const {getReduxAuthSliceIsUserAuthenticated, getReduxAuthSliceUsername, setReduxAuthSlice} = useReduxAuthSliceService();
    const isUserAuthenticated = getReduxAuthSliceIsUserAuthenticated();
    const {httpAuthLogout} = useHttpAuth();
    const username = getReduxAuthSliceUsername();

    const handleLogOut = async () => {
        // Provide username so BE can remove refreshToken if exist in the backend
        const authTO = {username: username} as AuthTOProps;
        await httpAuthLogout(authTO);
        // Remove everything from redux
        await setReduxAuthSlice(false, '', '', '', false);
        // Reset header because the accessToken will still be tagged to it
    };

    return (
        <>
            <nav className="flex justify-center">
                {isUserAuthenticated ? (
                    <CustomUserNavMenu onLogOut={() => handleLogOut()}></CustomUserNavMenu>
                ) : (
                    <span className="flex justify-between gap-4">
                        {loginNavBarItems.map((item, index) => {
                            return (
                                <Link
                                    to={item.path}
                                    className="relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
                                    key={index}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </span>
                )}
            </nav>
        </>
    );
};

export default LoginNavBar;
