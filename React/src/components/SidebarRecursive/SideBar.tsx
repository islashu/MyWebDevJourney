import React, {memo, useEffect, useRef} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsDocumentProps} from '../../model/tab.model.ts';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import SideBarTab from './SideBarTab.tsx';
import {sideBarTabs} from '../../../test data/data.tsx';
import {MAX_TAB_NESTED_COUNT} from '../config.ts';
import SideBarAddNewTabButton from './SideBarAddNewTabButton.tsx';
import {ToastContainer, toast} from 'react-toastify';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';
/*
 * For this to exist along side every other component, you have to use an outlet
 * */
const SideBar = () => {
    const {httpTabsGetTabs} = useHttpTabs();
    const {validateSideBarPrivateAccess, validateIsAdmin} = useAuthoriser();

    const usernameRef = useRef();

    const [tabs, setTabs] = useState<TabsDocumentProps[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const {getReduxTabsSliceIsRefresh, setReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const isRefresh = getReduxTabsSliceIsRefresh();

    // Get Tabs Data via HTTP
    useEffect(() => {
        let isMounted: boolean = true;
        const controller: AbortController = new AbortController();
        const getTabs = async (): Promise<void> => {
            try {
                await httpTabsGetTabs(controller.signal)
                    .then((response: TabsDocumentProps[]): void => {
                        isMounted && setTabs(response);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (err) {
                // Handle error
                console.log(err);
            }
        };
        getTabs();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [isRefresh]);

    return (
        <>
            <nav className="sticky top-12">
                <div className="w-full text-sm text-slate-600 p-1 pl-2 font-medium"> Getting Started</div>
                <section className=" flex flex-col w-full">
                    {/*This nested count let us know where is the end of the tree if nested count = 0 = leaf node*/}
                    {tabs.length > 0 ? <SideBarTab children={tabs} nestedCount={MAX_TAB_NESTED_COUNT}></SideBarTab> : null}
                    {/* Add a new tab button*/}
                    {validateIsAdmin() ? <SideBarAddNewTabButton></SideBarAddNewTabButton> : null}
                </section>
            </nav>
        </>
    );
};

export default SideBar;
