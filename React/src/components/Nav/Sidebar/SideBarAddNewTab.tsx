import React, {Fragment, memo, useEffect, useRef, useState} from 'react';
import ModalContainer from '../../Modal/ModalContainer.tsx';
import {FaCirclePlus} from 'react-icons/fa6';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';
import {useHttpTabsJwt} from '../../../api/tabs/tabs.jwt.api.ts';
import {TabsDocumentProps, TabsTO} from '../../../model/tab.model.ts';
import {useFieldArray, useForm} from 'react-hook-form';
import {toast, ToastContainer} from 'react-toastify';

const SideBarAddNewTab = ({onAddNewTab}: {onAddNewTab: (tabs: TabsDocumentProps[]) => void}) => {
    const {httpTabsCreateNewTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();

    const [isToggle, setIsToggle] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid, isSubmitSuccessful},
        setValue,
        getValues,
        reset
    } = useForm();

    const {
        fields: childTabsFields,
        append: childTabsAppend,
        remove: childTabsRemove
    } = useFieldArray({
        name: 'childTabs',
        control
    });

    type FormValues = {
        tabName: string;
        isPrivate: boolean;
        childTabs: {
            name: string;
            path: string;
            isPrivate: boolean;
        }[];
    };

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);
    const onSubmit = async (data: FormValues): Promise<void> => {
        try {
            const newTabData = new TabsTO({
                name: data.tabName,
                childTabs: data.childTabs,
                isPrivate: data.isPrivate
            });
            await toast.promise(
                async () => {
                    await httpTabsCreateNewTab(newTabData);
                    const updatedTabs = await httpTabsGetTabs();
                    onAddNewTab(updatedTabs);
                    setIsToggle(false);
                },
                {
                    pending: 'Updating tab...',
                    success: 'Tab updated successfully',
                    error: 'Error updating tab'
                }
            );
        } catch (err) {
            console.log(err);
        }
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
                <form className="items-left mx-auto flex max-w-2xl flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="tabName">Name of Tab:</label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="tabName"
                        {...register('tabName', {required: true})}
                        placeholder="Tab Name"
                    />
                    {errors.tabName && <span>This field is required</span>}

                    <section className="flex justify-between border border-black border-solid">
                        <label htmlFor="isPrivate">Is Tab Private:</label>
                        <input
                            className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                            type="checkbox"
                            id="isPrivate"
                            {...register('isPrivate')}
                        />
                    </section>

                    <section className="flex flex-col justify-between border border-black border-solid">
                        {childTabsFields.map((field, index) => (
                            <div className="flex" key={field.id}>
                                <section className="flex flex-col">
                                    <label htmlFor="childTabName">Child Tab Name</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="text"
                                        id="childTabName"
                                        {...register(`childTabs.${index}.name`, {required: true})}
                                        placeholder="Tab Name"
                                    />
                                </section>
                                {errors.childTabs?.[index]?.name && <span>This field is required</span>}

                                <section className="flex flex-col">
                                    <label htmlFor="childTabPath">Path of child tab</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="text"
                                        id="childTabPath"
                                        {...register(`childTabs.${index}.path`, {required: true})}
                                        placeholder="Tab Path"
                                    />
                                </section>
                                {errors.childTabs?.[index]?.path && <span>This field is required</span>}

                                <section className="flex flex-col">
                                    <label htmlFor="childTabIsPrivate">Is Private</label>
                                    <input
                                        className="w-32 rounded-xl border border-solid border-slate-900 p-3 text-black dark:border-none"
                                        type="checkbox"
                                        id="childTabIsPrivate"
                                        {...register(`childTabs.${index}.isPrivate`)}
                                        placeholder="Tab Path"
                                    />
                                </section>
                                {index > 0 && (
                                    <button type="button" onClick={() => childTabsRemove(index)} className="remove-btn">
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </section>

                    <button type="button" onClick={() => childTabsAppend({name: '', path: '', isPrivate: false})}>
                        Add New Child Tab
                    </button>

                    <label htmlFor="submit"></label>
                    <button
                        disabled={!isValid}
                        className="border border-solid border-slate-900 text-black dark:border-none sm:text-2xl bg-gray-50 hover:enabled:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </ModalContainer>
            <ToastContainer position={'top-right'} autoClose={2000} closeOnClick={true} />
        </>
    );
};

export default memo(SideBarAddNewTab);
