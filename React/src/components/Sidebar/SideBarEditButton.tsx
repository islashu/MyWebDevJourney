import React, {Fragment, useEffect, useRef, useState} from 'react';
import ModalContainer from '../Modal/ModalContainer.tsx';
import {CiEdit} from 'react-icons/ci';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm, SubmitHandler, useFieldArray} from 'react-hook-form';

const SideBarEditButton = ({props, onUpdateTabs}: {props: TabsDocumentProps; onUpdateTabs: (tabs: TabsDocumentProps[]) => void}) => {
    // Hooks
    const {httpTabsUpdateTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const [isToggle, setIsToggle] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid},
        setValue
    } = useForm({mode: 'onTouched'});

    const {
        fields: childTabsFields,
        append: childTabsAppend,
        remove: childTabsRemove
    } = useFieldArray({
        name: 'childTabs',
        control
    });

    useEffect(() => {
        setValue('tabName', props.name);
        setValue('isPrivate', props.isPrivate);
        setValue('childTabs', props.childTabs);
    }, []);

    type TabFormValues = {
        tabName: string;
        isPrivate: boolean;
        childTabs: [];
    };
    const onSubmit = async (data: TabFormValues): Promise<void> => {
        try {
            const newTabData: TabsTO = new TabsTO({
                uuid: props.uuid,
                name: data.tabName,
                childTabs: data.childTabs,
                isPrivate: data.isPrivate
            });
            await toast.promise(
                async () => {
                    await httpTabsUpdateTab(newTabData);
                    const updatedTabs = await httpTabsGetTabs();
                    setIsToggle(false);
                    // Re-render tabs in sidebar to take in new tabs data
                    onUpdateTabs(updatedTabs);
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
                                        {...register(`childTabs.${index}.relativePath`, {required: true})}
                                        placeholder="Tab Path"
                                    />
                                </section>
                                {errors.childTabs?.[index]?.relativePath && <span>This field is required</span>}

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

export default SideBarEditButton;
