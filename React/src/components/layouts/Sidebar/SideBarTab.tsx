import React, {ReactElement, memo, useState} from 'react';
import {SideBarChildTabProps, SideBarTabProps} from '../../../model/tab.model';
import CustomButton from '../../CustomButton/CustomButton.tsx';
import SideBarChildTab from './SideBarChildTab.tsx';

const SideBarTab = ({props}: {props: SideBarTabProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const [test, setTest] = useState(false);
    /* Each sidebar tab can have multiple child tabs*/
    const sideBarChildTabs: SideBarChildTabProps[] = props.childTabs;

    const renderSideBarChildTabs = () => {
        return sideBarChildTabs.map((sideBarChildTab: SideBarChildTabProps) => {
            return (
                <div key={sideBarChildTab.id}>
                    <SideBarChildTab props={sideBarChildTab}></SideBarChildTab>
                </div>
            );
        });
    };

    return (
        <>
            <CustomButton onClick={() => setIsToggle(!isToggle)} buttonName={props.name}></CustomButton>
            {isToggle ? renderSideBarChildTabs() : null}
        </>
    );
};

export default SideBarTab;
