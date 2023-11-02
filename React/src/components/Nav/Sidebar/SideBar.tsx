import React, {memo, useEffect, useRef} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';
import {TabsDocumentProps} from '../../../model/tab.model.ts';
import SideBarTab from './SideBarTab.tsx';
import SideBarAddNewTab from './SideBarAddNewTab.tsx';
import SideBarEditButton from './SideBarEditButton.tsx';
import SideBarDeleteButton from './SideBarDeleteButton.tsx';
import {useReduxAuthSliceService} from '../../../redux/slices/auth/authSlice.service.ts';
/*
 * For this to exist along side every other component, you have to use an outlet
 * */
const SideBar = () => {
    const {httpTabsGetTabs} = useHttpTabs();

    const usernameRef = useRef();

    const [tabs, setTabs] = useState<TabsDocumentProps[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const {getReduxAuthSliceIsAdmin} = useReduxAuthSliceService();
    const isAdmin = getReduxAuthSliceIsAdmin();

    // Get Tabs Data via HTTP
    useEffect(() => {
        // console.log('useEffect');
        // console.log(tabs);
        // let isMounted = true;
        // const controller = new AbortController();
        // const getTabs = async () => {
        //     try {
        //         await httpTabsGetTabs(controller.signal).then((response: TabsDocumentProps[]): void => {
        //             isMounted && setTabs(response);
        //             console.log(response);
        //         });
        //     } catch (err) {
        //         // Handle error
        //         console.log(err);
        //     }
        // };
        // getTabs();
        //
        // return () => {
        //     isMounted = false;
        //     controller.abort();
        // };
        httpTabsGetTabs().then((response: TabsDocumentProps[]): void => {
            setTabs(response);
        });
    }, []);

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log('edit tab submitted');
            setIsEditModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="w-96 border-solid border-black border text-center text-2xl font-bold"> Side bar</div>
            <nav>
                <section className=" flex flex-col w-96 border border-solid border-black">
                    {tabs.length > 0
                        ? tabs.map((sideBarTab: TabsDocumentProps) => {
                              return (
                                  <>
                                      <div key={sideBarTab.uuid}>
                                          <SideBarTab props={sideBarTab}></SideBarTab>
                                          {isAdmin ? (
                                              <SideBarEditButton
                                                  props={sideBarTab}
                                                  onUpdateTabs={(tabs: TabsDocumentProps[]) => setTabs(tabs)}
                                              ></SideBarEditButton>
                                          ) : null}
                                          {isAdmin ? (
                                              <SideBarDeleteButton
                                                  props={sideBarTab}
                                                  onDeleteTabs={(tabs: TabsDocumentProps[]) => setTabs(tabs)}
                                              ></SideBarDeleteButton>
                                          ) : null}
                                      </div>
                                  </>
                              );
                          })
                        : null}
                    {isAdmin ? <SideBarAddNewTab onAddNewTab={(tabs: TabsDocumentProps[]) => setTabs(tabs)}></SideBarAddNewTab> : null}
                </section>
            </nav>
            <Outlet></Outlet>
        </>
    );
};

export default SideBar;
