import React, {ReactElement, memo, useState} from 'react';
import {ChildTabProps, TabsDocumentProps} from '../../../model/tab.model.ts';
import SideBarChildTab from './SideBarChildTab.tsx';

const SideBarTab = ({props}: {props: TabsDocumentProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const [test, setTest] = useState(false);
    /* Each sidebar tab can have multiple child tabs*/
    const sideBarChildTabs: ChildTabProps[] = props.childTabs;

    const renderSideBarChildTabs = () => {
        return sideBarChildTabs.map((sideBarChildTab: ChildTabProps, index: number) => {
            return (
                <div key={index}>
                    <SideBarChildTab props={sideBarChildTab}></SideBarChildTab>
                </div>
            );
        });
    };

    return (
        <>
            <button className={` border-black border border-solid bg-amber-50 w-full `} onClick={() => setIsToggle(!isToggle)}>
                {props.name}
            </button>
            <nav className={`${isToggle ? 'max-h-40' : 'max-h-5'} transition-all duration-700 ease-in-out overflow-hidden`}>
                {isToggle ? renderSideBarChildTabs() : null}
            </nav>
        </>
    );
};

export default SideBarTab;
