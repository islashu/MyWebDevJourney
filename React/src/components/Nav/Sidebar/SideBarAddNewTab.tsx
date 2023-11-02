import React, {memo, useEffect, useRef, useState} from 'react';
import ModalContainer from '../../Modal/ModalContainer.tsx';
import {FaCirclePlus} from 'react-icons/fa6';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';
import {useHttpTabsJwt} from '../../../api/tabs/tabs.jwt.api.ts';
import {TabsDocumentProps, TabsTO} from '../../../model/tab.model.ts';

const SideBarAddNewTab = ({onAddNewTab}: {onAddNewTab: (tabs: TabsDocumentProps[]) => void}) => {
    const {httpTabsCreateNewTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();

    const [isToggle, setIsToggle] = useState<boolean>(false);

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

    // Converting string to html can cause CSS so it might be best to avoid this
    // const tabIconRef = useRef();
    // const [tabIcon, setTabIcon] = useState('');
    // const [isTabIconValid, setIsTabIconValid] = useState(true);
    // const [tabIconFocus, setTabIconFocus] = useState(false);

    // run validation
    useEffect((): void => {
        if (tabName === '') {
            setIsTabNameValid(false);
        } else {
            setIsTabNameValid(true);
        }
    }, [tabName]);

    const handleSubmit = async (e): Promise<void> => {
        try {
            e.preventDefault();
            const newTabData = new TabsTO({
                name: tabName,
                childTabs: childTabList,
                isPrivate: isPrivate
            });
            await httpTabsCreateNewTab(newTabData);
            const updatedTabs = await httpTabsGetTabs();
            onAddNewTab(updatedTabs);
            clearFormData();
            setIsToggle(false);
        } catch (err) {
            console.log(err);
        }
    };

    const clearFormData = () => {
        try {
            setTabName('');
            setIsPrivate(false);
            setChildTabList([
                {
                    name: '',
                    path: '',
                    isPrivate: false
                }
            ]);
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
            <span
                className="w-full flex justify-center text-center font-bold border border-black border-solid bg-blue-100 hover:bg-sky-300 transition ease-in-out duration-300 p-2"
                onClick={() => setIsToggle(true)}
            >
                <FaCirclePlus size={20} />
            </span>
            <ModalContainer
                title={'Add new navigation tab'}
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
                            ref={isPrivateRef}
                            onChange={(e) => {
                                let isChecked = e.target.checked;
                                if (isChecked) {
                                    setIsPrivate(true);
                                    console.log('value is checked');
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

export default memo(SideBarAddNewTab);
