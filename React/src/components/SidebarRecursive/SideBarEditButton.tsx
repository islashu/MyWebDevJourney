import {Button, Modal} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {FormProvider, useFieldArray, useForm} from 'react-hook-form';
import {CiEdit} from 'react-icons/ci';
import {toast, ToastContainer} from 'react-toastify';
import useEditForm from './edit form hooks/useEditForm.tsx';
import EditFormFields from './edit form hooks/EditFormFields..tsx';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useNavigate} from 'react-router-dom';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';

const SideBarEditButton = ({tabData}: {tabData: TabsDocumentProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const {handleSubmit, methods} = useEditForm();
    const {httpTabsUpdateTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const navigate = useNavigate();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();

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

            await httpTabsUpdateTab(newTabData);
            const updatedTabs = await httpTabsGetTabs();
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
            navigate('/reference');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <button onClick={() => setIsToggle(true)}>
                <CiEdit size={20} />
            </button>

            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Edit an existing tab">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EditFormFields tabData={tabData}></EditFormFields>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            </Modal>

            <ToastContainer position={'top-right'} autoClose={2000} closeOnClick={true} />
        </>
    );
};

export default SideBarEditButton;
