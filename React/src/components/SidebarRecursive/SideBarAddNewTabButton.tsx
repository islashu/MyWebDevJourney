import React, {FC, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import useAddForm from './add form hooks/useAddForm.tsx';
import {TbSquarePlus} from 'react-icons/tb';
import {Button, Group, Modal, NavLink} from '@mantine/core';
import {toast, ToastContainer} from 'react-toastify';
import AddFormFields from './add form hooks/AddFormFields..tsx';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsTO} from '../../model/tab.model.ts';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';
import {useToast} from '../../hooks/useToast.tsx';
import CustomButton from '../CustomMantineComponents/common/CustomButton/CustomButton.tsx';

const SideBarAddNewTabButton = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const {methods, handleSubmit, reset} = useAddForm();
    const {httpTabsCreateNewTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();
    const [isLoading, setIsLoading] = useState(false);
    const {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();

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
            toastLoading('sideBarAddNewTab');
            await httpTabsCreateNewTab(newTabData);
            // Re-render
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
            updateToastLoadingToSuccess('sideBarAddNewTab', 'New tab added successful!', 'New tab added!');
        } catch (err) {
            console.log(err);
            updateToastLoadingToFailure('sideBarAddNewTab', 'New tab added unsuccessful!', 'Please try again');
        }
    };

    return (
        <>
            <Button className="w-32" onClick={() => setIsToggle(true)}>
                <TbSquarePlus size={20} />
            </Button>
            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Add new tab">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AddFormFields></AddFormFields>

                        <Group justify="flex-end" mt="md">
                            <CustomButton type="submit" name="Submit"></CustomButton>
                            <CustomButton onClick={() => reset()} name="Reset"></CustomButton>
                        </Group>
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

export default SideBarAddNewTabButton;
