import React, {FC, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {FaCirclePlus} from 'react-icons/fa6';
import useAddForm from './add form hooks/useAddForm.tsx';
import {Button, Modal} from '@mantine/core';
import {toast, ToastContainer} from 'react-toastify';
import AddFormFields from './add form hooks/AddFormFields..tsx';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsTO} from '../../model/tab.model.ts';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';

const SideBarAddNewTabButton = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const {methods, handleSubmit, reset} = useAddForm();
    const {httpTabsCreateNewTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();

    type FormValues = {
        name: string;
        isPrivate: boolean;
        childTabs: [];
        path: string;
    };
    const onSubmit = async (data: FormValues): Promise<void> => {
        console.log('data', data);
        try {
            const newTabData = new TabsTO({
                name: data.name,
                childTabs: data.childTabs,
                isPrivate: data.isPrivate,
                path: data.path
            });
            await httpTabsCreateNewTab(newTabData);
            // Re-render
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
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
            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Add new tab">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AddFormFields></AddFormFields>
                        <Button type="submit">Submit</Button>
                        <Button onClick={() => reset()}>Reset</Button>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

export default SideBarAddNewTabButton;
