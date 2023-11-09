import React, {memo, useEffect, useRef} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useState} from 'react';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsDocumentProps} from '../../model/tab.model.ts';
import SideBarTab from './SideBarTab.tsx';
import SideBarAddNewTab from './SideBarAddNewTab.tsx';
import SideBarEditButton from './SideBarEditButton.tsx';
import SideBarDeleteButton from './SideBarDeleteButton.tsx';
import {useAuthoriser} from '../../hooks/useAuthoriser.ts';
import {sideBarTabs} from '../../../test data/data.tsx';
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

    // Get Tabs Data via HTTP
    useEffect(() => {
        let isMounted: boolean = true;
        const controller: AbortController = new AbortController();
        const getTabs = async (): Promise<void> => {
            try {
                await httpTabsGetTabs(controller.signal)
                    .then((response: TabsDocumentProps[]): void => {
                        isMounted && setTabs(response);
                        console.log(response);
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
            <body className="grid grid-cols-5 gap-4">
                <nav className="border-2 border-black">
                    <label className="w-full border-solid border-black border text-center text-2xl font-bold"> Side bar</label>
                    <section className=" flex flex-col w-full border border-solid border-black">
                        {tabs.length > 0
                            ? tabs.map((sideBarTab: TabsDocumentProps, index) => {
                                  return (
                                      <div key={sideBarTab.uuid}>
                                          {validateSideBarPrivateAccess(sideBarTab) ? <SideBarTab props={sideBarTab}></SideBarTab> : null}
                                          {validateIsAdmin() ? (
                                              <SideBarEditButton
                                                  props={sideBarTab}
                                                  onUpdateTabs={(tabs: TabsDocumentProps[]) => setTabs(tabs)}
                                              ></SideBarEditButton>
                                          ) : null}
                                          {validateIsAdmin() ? (
                                              <SideBarDeleteButton
                                                  props={sideBarTab}
                                                  onDeleteTabs={(tabs: TabsDocumentProps[]) => setTabs(tabs)}
                                              ></SideBarDeleteButton>
                                          ) : null}
                                      </div>
                                  );
                              })
                            : null}
                        {validateIsAdmin() ? <SideBarAddNewTab onAddNewTab={(tabs: TabsDocumentProps[]) => setTabs(tabs)}></SideBarAddNewTab> : null}
                    </section>
                </nav>
                <div className="col-span-4">
                    <Outlet></Outlet>
                </div>
            </body>
        </>
    );
};

export default SideBar;
