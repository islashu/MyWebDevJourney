import {Menu} from '@mantine/core';
import React, {FC} from 'react';

interface CustomMenu {
    children: React.ReactNode;
}

const CustomMenu: FC<CustomMenu> = ({children}) => {
    return (
        <>
            <Menu>{children}</Menu>
        </>
    );
};

export default CustomMenu;
