import React, {useEffect, useRef, useState} from 'react';
import ModalContainer from '../../Modal/ModalContainer.tsx';
import {CiEdit} from 'react-icons/ci';
import {TabsDocumentProps, TabsTO} from '../../../model/tab.model.ts';
import {useHttpTabsJwt} from '../../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';

const SideBarEditButton = ({props, onUpdateTabs}: {props: TabsDocumentProps; onUpdateTabs: (tabs: TabsDocumentProps[]) => void}) => {
    // Hooks
    const {httpTabsUpdateTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();

    // UseStates and UseRefs
    const [isToggle, setIsToggle] = useState(false);

    const tabNameRef = useRef();
    const [tabName, setTabName] = useState('');
    const [isTabNameValid, setIsTabNameValid] = useState(false);
    const [tabNameFocus, setTabNameFocus] = useState(false);

    const isPrivateRef = useRef();
    const [isPrivate, setIsPrivate] = useState(false);

    const [childTabList, setChildTabList] = useState([
        {
            name: '',
            path: '',
            isPrivate: false
        }
    ]);

    /*
     Pass the data of the "tab to update" to the modal component
    */
    useEffect(() => {
        console.log('props', props);
        setTabName(props.name);
        setIsPrivate(props.isPrivate);
        setChildTabList(props.childTabs);
    }, []);

    /*
     For Validation of fields
    */
    useEffect(() => {
        if (tabName === '') {
            setIsTabNameValid(false);
        } else {
            setIsTabNameValid(true);
        }
    }, [tabName]);

    const handleSubmit = async (e): Promise<void> => {
        try {
            e.preventDefault();
            const newTabData: TabsTO = new TabsTO({
                uuid: props.uuid,
                name: tabName,
                childTabs: childTabList,
                isPrivate: isPrivate
            });
            console.log('newTabData', newTabData);
            await httpTabsUpdateTab(newTabData);
            const updatedTabs = await httpTabsGetTabs();
            setIsToggle(false);
            onUpdateTabs(updatedTabs);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddNewChildTab = () => {
        setChildTabList([
            ...childTabList,
            {
                name: '',
                path: '',
                isPrivate: false
            }
        ]);
    };
    const handleRemoveNewChildTab = (index) => {
        const newChildTabList = [...childTabList];
        newChildTabList.splice(index, 1);
        setChildTabList(newChildTabList);
    };

    const handleChangeNameNewChildTab = (e, index) => {
        const {name, value} = e.target;
        const list = [...childTabList];
        list[index].name = value;
        setChildTabList(list);
    };

    const handleChangePathNewChildTab = (e, index) => {
        const {path, value} = e.target;
        const list = [...childTabList];
        list[index].path = value;
        setChildTabList(list);
    };

    const handleChangeIsPrivateNewChildTab = (e, index) => {
        let isChecked = e.target.checked ? true : false;

        const list = [...childTabList];
        list[index].isPrivate = isChecked;
        setChildTabList(list);
    };

    return (
        <>
            <button onClick={() => setIsToggle(true)}>
                <CiEdit size={20} />
            </button>
            <ModalContainer
                title={'Edit existing tab'}
                isOpen={isToggle}
                onClose={() => {
                    setIsToggle(false);
                }}
            >
                <form className="items-left mx-auto flex max-w-2xl flex-col gap-4 " onSubmit={(event) => handleSubmit(event)}>
                    <label htmlFor="tabName" className={isTabNameValid ? '' : 'text-rose-700 font-bold'}>
                        Name of Tab:
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="tabName"
                        ref={tabNameRef}
                        value={tabName}
                        onChange={(e) => setTabName(e.target.value)}
                        onFocus={() => setTabNameFocus(true)}
                        onBlur={() => {
                            setTabNameFocus(false);
                        }}
                        required
                    />

                    <section className="flex justify-between border border-black border-solid">
                        <label htmlFor="tabIsPrivate">Is Tab Private:</label>
                        <input
                            className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                            type="checkbox"
                            id="tabIsPrivate"
                            checked={isPrivate}
                            ref={isPrivateRef}
                            onChange={(e) => {
                                let isChecked = e.target.checked;
                                if (isChecked) {
                                    setIsPrivate(true);
                                } else {
                                    setIsPrivate(false);
                                }
                            }}
                        />
                    </section>

                    {childTabList.map((childTab, index) => (
                        <>
                            <div className="flex justify-between border border-black border-solid">
                                <section className="flex flex-col">
                                    <label htmlFor="childTabName">Child Tab Name</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="text"
                                        id="childTabName"
                                        value={childTab.name}
                                        onChange={(e) => handleChangeNameNewChildTab(e, index)}
                                        required
                                    />
                                </section>

                                <section className="flex flex-col">
                                    <label htmlFor="childTabPath">Path of child tab</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="text"
                                        id="childTabPath"
                                        value={childTab.path}
                                        onChange={(e) => handleChangePathNewChildTab(e, index)}
                                        required
                                    />
                                </section>

                                <section className="flex flex-col">
                                    <label htmlFor="childTabIsPrivate">Is Private</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="checkbox"
                                        id="childTabIsPrivate"
                                        checked={childTab.isPrivate}
                                        onChange={(e) => handleChangeIsPrivateNewChildTab(e, index)}
                                    />
                                </section>

                                <section>
                                    {childTabList.length !== 1 && (
                                        <button type="button" onClick={() => handleRemoveNewChildTab(index)} className="remove-btn">
                                            <span>Remove</span>
                                        </button>
                                    )}
                                </section>
                            </div>
                            {childTabList.length - 1 === index && childTabList.length < 4 && (
                                <button type="button" onClick={() => handleAddNewChildTab()} className="">
                                    <span>Add</span>
                                </button>
                            )}
                        </>
                    ))}

                    <label htmlFor="submit"></label>
                    <button
                        disabled={!isTabNameValid}
                        className="border border-solid border-slate-900 text-black dark:border-none sm:text-2xl bg-gray-50 hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </ModalContainer>
        </>
    );
};

export default SideBarEditButton;
function httpTabsGetTabs() {
    throw new Error('Function not implemented.');
}
