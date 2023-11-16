import {Menu} from '@mantine/core';
import React, {FC, useState} from 'react';
import CustomMenu from '../CustomMantineComponents/common/CustomMenu/CustomMenu.tsx';
import CustomAvatar from '../CustomMantineComponents/common/CustomAvatar/CustomAvatar.tsx';
import {TbLogout} from 'react-icons/tb';
import {AuthTOProps} from '../../model/auth.model.ts';
import {useHttpAuth} from '../../api/auth/auth.api.ts';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service.ts';
import {useNavigate} from 'react-router-dom';
import {useToast} from '../../hooks/useToast.tsx';
import {TbSettings} from 'react-icons/tb';

interface CustomUserNavMenuProps {}
const CustomUserNavMenu: FC<CustomUserNavMenuProps> = () => {
    const {httpAuthLogout} = useHttpAuth();
    const {getReduxAuthSliceIsUserAuthenticated, getReduxAuthSliceUsername, setReduxAuthSlice} = useReduxAuthSliceService();
    const username = getReduxAuthSliceUsername();
    const navigate = useNavigate();
    const {toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            toastLoading('toastLogout');
            // Provide username so BE can remove refreshToken if exist in the backend
            const authTO = {username: username} as AuthTOProps;
            await httpAuthLogout(authTO);
            // Remove everything from redux
            await setReduxAuthSlice(false, '', '', '', false, false);
            // Reset header because the accessToken will still be tagged to it
            updateToastLoadingToSuccess('toastLogout', 'Logout successful', 'You are now logged out!');
            navigate('/');
        } catch (err) {
            updateToastLoadingToFailure('toastLogout', 'Logout unsuccessful', 'Please try again!');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoToSettings = () => {
        navigate('/settings');
    };

    return (
        <CustomMenu>
            <Menu.Target>
                <button>
                    <CustomAvatar></CustomAvatar>
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{username}'s Settings</Menu.Label>
                <Menu.Item leftSection={<TbSettings />} onClick={() => handleGoToSettings()}>
                    Settings
                </Menu.Item>
                <Menu.Item leftSection={<TbLogout />} onClick={() => handleLogOut()}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
            <Menu.Divider />
        </CustomMenu>
    );
};

export default CustomUserNavMenu;
