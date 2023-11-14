import {Button} from '@mantine/core';
import React, {Fragment, ReactNode, useState} from 'react';
import SideBarAddNewTabButton from './SideBarAddNewTabButton.tsx';
import {MAX_TAB_NESTED_COUNT} from '../config.ts';
import SideBarEditButton from './SideBarEditButton.tsx';
import {NavLink} from '@mantine/core';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import SideBarDeleteButton from './SideBarDeleteButton.tsx';
import {useNavigate} from 'react-router-dom';

const SideBarTab = ({nestedCount, children}) => {
    const [active, setActive] = useState(0);
    const {validateChildSideBarPrivateAccess, validateIsAdmin} = useAuthoriser();
    const navigate = useNavigate();

    // The ability to click on a button and navigate to a new page can only exist on the youngest child tab
    const handleNavigate = (index) => {
        if (nestedCount === 0) {
            console.log('side bar tab navigate');
            console.log(children[index].path);
            navigate(children[index].path);
        }
    };

    return (
        <>
            <div>
                {children.map((parent, index) => {
                    return (
                        <Fragment key={index}>
                            {validateChildSideBarPrivateAccess(parent) ? (
                                <nav className="relative bg-slate-100">
                                    {nestedCount == MAX_TAB_NESTED_COUNT && validateIsAdmin() ? (
                                        <div className="flex justify-center absolute top-3 right-10">
                                            <SideBarEditButton tabData={parent}></SideBarEditButton>
                                            <SideBarDeleteButton tabData={parent}></SideBarDeleteButton>
                                        </div>
                                    ) : null}
                                    <NavLink
                                        onClick={() => handleNavigate(index)}
                                        active={index}
                                        label={parent.name}
                                        childrenOffset={20}
                                        variant="subtle"
                                        className="text-xl font-medium"
                                    >
                                        {/* Only show the edit button if the user is an admin, is the tab private and it is the parent to all tabs*/}

                                        {nestedCount > 0 && parent.childTabs ? (
                                            <SideBarTab children={parent.childTabs} nestedCount={nestedCount - 1} />
                                        ) : null}
                                    </NavLink>
                                </nav>
                            ) : null}
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default SideBarTab;
