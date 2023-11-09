import React, {useState} from 'react';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';
import {CiCircleMinus} from 'react-icons/ci';
import {Modal} from '@mantine/core';
import {useReduxTabsSliceService} from '../../redux/slices/tabs/tabsSlice.service.ts';

const SideBarDeleteButton = ({tabData}: {tabData: TabsDocumentProps}) => {
    const [isToggle, setIsToggle] = useState(false);
    const {httpTabsDeleteTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();
    const {setReduxTabsSliceIsRefresh, getReduxTabsSliceIsRefresh} = useReduxTabsSliceService();
    const refreshState = getReduxTabsSliceIsRefresh();

    const handleDelete = async () => {
        try {
            console.log('tabData', tabData);
            const tabsTO = new TabsTO({uuid: tabData.uuid});
            if (!tabData.uuid) throw new Error('Missing uuid to delete');
            await httpTabsDeleteTab(tabsTO);
            const updatedTabs = await httpTabsGetTabs();
            // // isRefresh
            console.log('uuid', tabData.uuid);
            setIsToggle(false);
            setReduxTabsSliceIsRefresh(!refreshState);
        } catch (err) {
            console.log('error deleting something');
        }
    };

    return (
        <>
            <button onClick={() => setIsToggle(true)}>
                <CiCircleMinus size={20} />
            </button>
            <Modal opened={isToggle} onClose={() => setIsToggle(!isToggle)} size="50%" title="Delete existing tab">
                <div>
                    <div className="text-4xl">
                        Are you sure you want to continue deleting this parent tab. Deleting the parent tab, delete all child tabs.{' '}
                    </div>
                    <div className="text-2xl">If you wish to delete a children tab, you can do so by updating the tab and remove the child tab.</div>
                </div>

                <button onClick={() => handleDelete()} className="py-1 px-2 rounded border-none bg-red-600">
                    Delete
                </button>
                <button onClick={() => setIsToggle(false)} className="py-1 px-2 rounded border-none bg-blue-600">
                    Cancel
                </button>
            </Modal>
        </>
    );
};

export default SideBarDeleteButton;
