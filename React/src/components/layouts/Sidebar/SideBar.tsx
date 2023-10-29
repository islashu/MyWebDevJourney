import React, {memo, useEffect} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';
import {SideBarTabProps} from '../../../model/tab.model.ts';
import SideBarTab from './SideBarTab.tsx';
import sideBarTab from './SideBarTab.tsx';
import {sideBarTabs} from '../../../../test data/data.tsx';
/*
 * For this to exist along side every other component, you have to use an outlet
 * */
const SideBar = () => {
    const {httpTabsGetAllTabs} = useHttpTabs();

    const [tabs, setTabs] = useState<SideBarTabProps[]>([]);

    useEffect(() => {
        console.log('use effect!!');
        let isMounted = true;
        const controller = new AbortController();
        const tabs = async () => {
            try {
                // await httpTabsGetAllTabs(controller.signal).then((response: SideBarTabProps[]): void => {
                //     isMounted && setTabs(response);
                // });

                // TODO: remove and uncomment the above once BE is completed
                setTabs(sideBarTabs);
            } catch (err) {
                // Handle error
                console.log(err);
            }
        };
        tabs();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const renderSideBarTabs = () => {
        return tabs.map((sideBarTab: SideBarTabProps) => {
            return (
                <>
                    <div key={sideBarTab.id}>
                        <SideBarTab props={sideBarTab}></SideBarTab>
                    </div>
                </>
            );
        });
    };

    return (
        <>
            <div className="w-64 border-solid border-black border text-center text-2xl font-bold"> Side bar</div>
            <nav>
                <section className=" flex flex-col w-64 border border-solid border-black">{renderSideBarTabs()}</section>
            </nav>
            <Outlet></Outlet>
        </>
    );
};

export default SideBar;
