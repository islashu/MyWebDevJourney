import {Button} from '@mantine/core';
import React from 'react';

interface MiniSideNavMenuProps {
    onClickPost: () => void;
}
const MiniSideNavMenu = ({onClickPost}: MiniSideNavMenuProps) => {
    const handleOnClick = () => {
        onClickPost();
    };

    return (
        <>
            <div className="w-full border-black border-solid border-2">
                <label className="font-bold">Mini Side Nav Menu</label>
                <ul className="flex flex-col space-y-2">
                    <li className="flex justify-center">
                        <Button onClick={() => handleOnClick()}>Create new Post</Button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MiniSideNavMenu;
