import React, {useState} from 'react';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {TbCircleXFilled, TbAlertCircleFilled} from 'react-icons/tb';
import {Alert, Fieldset, Group, Modal} from '@mantine/core';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';
import CustomButton from '../CustomComponents/common/CustomButton/CustomButton.tsx';
import {useToast} from '../../hooks/useToast.tsx';

const SideBarDeleteButton = ({tabData}: {tabData: TabsDocumentProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const {httpTabsDeleteTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();
    const {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            const tabsTO = new TabsTO({uuid: tabData.uuid});
            toastLoading('loadDelete');
            if (!tabData.uuid) throw new Error('Missing uuid to delete');
            await httpTabsDeleteTab(tabsTO);
            const updatedTabs = await httpTabsGetTabs();
            // // isRefresh
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
            updateToastLoadingToSuccess('loadDelete', 'Delete successful', 'Tab has been deleted!');
        } catch (err) {
            updateToastLoadingToFailure('loadDelete', 'Delete failed', 'Please try again');
            console.log('error deleting something');
        }
    };

    return (
        <>
            <button className="text-red-400" onClick={() => setIsToggle(true)}>
                <TbCircleXFilled size={20} />
            </button>
            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Delete existing tab">
                <Fieldset>
                    <div className="text-xl p-4">
                        Are you sure you want to continue deleting this parent tab? Deleting the parent tab, deletes all child tabs!
                    </div>
                    <Alert className=" p-4 italic" title="Note" icon={<TbAlertCircleFilled size={20} />}>
                        If you wish to delete a children tab, you can do so by updating the tab and remove the child tab.
                    </Alert>
                </Fieldset>

                <Group justify="flex-end" mt="md">
                    <CustomButton onClick={() => handleDelete()} color="red" name="Delete"></CustomButton>
                    <CustomButton onClick={() => setIsToggle(false)} name="Cancel"></CustomButton>
                </Group>
            </Modal>
        </>
    );
};

export default SideBarDeleteButton;
