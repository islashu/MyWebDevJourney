import {Menu} from '@mantine/core';
import React, {FC} from 'react';
import CustomMenu from '../common/CustomMenu/CustomMenu.tsx';
import CustomAvatar from '../common/CustomAvatar/CustomAvatar.tsx';
import {TbLogout} from 'react-icons/tb';

interface CustomUserNavMenuProps {
    onLogOut: Function;
}
const CustomUserNavMenu: FC<CustomUserNavMenuProps> = ({onLogOut}) => {
    const handleLogOut = () => {
        onLogOut();
    };

    return (
        <CustomMenu>
            <Menu.Target>
                <button>
                    <CustomAvatar></CustomAvatar>
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>User Settings</Menu.Label>

                <Menu.Item leftSection={<TbLogout />} onClick={() => handleLogOut()}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
            <Menu.Divider />
        </CustomMenu>
    );
};

export default CustomUserNavMenu;
