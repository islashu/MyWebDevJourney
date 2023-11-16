import {Button} from '@mantine/core';
import React from 'react';
import SideBarTab from '../SidebarRecursive/SideBarTab.tsx';
import {MAX_TAB_NESTED_COUNT} from '../config.ts';
import SideBarAddNewTabButton from '../SidebarRecursive/SideBarAddNewTabButton.tsx';
import {Outlet} from 'react-router-dom';

interface MiniSideNavMenuProps {
    onClickPost: () => void;
}
const MiniSideNavMenu = ({onClickPost}: MiniSideNavMenuProps) => {
    const handleOnClick = () => {
        onClickPost();
    };

    return (
        <>
            <div className="sticky top-12">
                <div className="max-h-[300px] max-w-[275px] top-14 sticky mx-auto">
                    <div className="w-full text-sm text-slate-600 p-1 pl-2 font-medium"> ON THIS PAGE</div>
                    <ul className="flex flex-col space-y-2">
                        <li className="flex">
                            <Button onClick={() => handleOnClick()}>Create new Post</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MiniSideNavMenu;
