import {Button, Group, Modal} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {FormProvider, useFieldArray, useForm} from 'react-hook-form';
import {TbSquareRoundedPlusFilled} from 'react-icons/tb';
import {toast, ToastContainer} from 'react-toastify';
import useEditForm from './edit form hooks/useEditForm.tsx';
import EditFormFields from './edit form hooks/EditFormFields..tsx';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useNavigate} from 'react-router-dom';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';
import CustomButton from '../CustomComponents/common/CustomButton/CustomButton.tsx';
import {useToast} from '../../hooks/useToast.tsx';

const SideBarEditButton = ({tabData}: {tabData: TabsDocumentProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const {handleSubmit, methods} = useEditForm();
    const {httpTabsUpdateTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const navigate = useNavigate();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();
    const [isLoading, setIsLoading] = useState(false);
    const {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();

    type TabFormValues = {
        uuid: string;
        name: string;
        isPrivate: boolean;
        childTabs: [];
        path: string;
    };
    const onSubmit = async (data: TabFormValues): Promise<void> => {
        try {
            const newTabData: TabsTO = new TabsTO({
                // We are using the uuid of the existing tabData in order to update the tab information
                uuid: tabData.uuid,
                name: data.name,
                childTabs: data.childTabs,
                isPrivate: data.isPrivate,
                path: data.path
            });
            setIsLoading(true);
            toastLoading('sideBarEdit');
            await httpTabsUpdateTab(newTabData);
            await httpTabsGetTabs();
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
            updateToastLoadingToSuccess('sideBarEdit', 'Existing tab updated successful!', 'Tab updated!');
            navigate('/reference');
        } catch (err) {
            console.log(err);
            updateToastLoadingToFailure('sideBarEdit', 'Existing tab updated unsuccessful!', 'Please try again');
        }
    };

    return (
        <>
            <button className="text-blue-400" onClick={() => setIsToggle(true)}>
                <TbSquareRoundedPlusFilled size={20} />
            </button>

            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Edit an existing tab">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EditFormFields tabData={tabData}></EditFormFields>
                        <Group justify="flex-end" mt="md">
                            <CustomButton name="submit" type="submit"></CustomButton>
                        </Group>
                    </form>
                </FormProvider>
            </Modal>

            <ToastContainer position={'top-right'} autoClose={2000} closeOnClick={true} />
        </>
    );
};

export default SideBarEditButton;
