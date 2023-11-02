import React, {useState} from 'react';
import {CiCircleMinus} from 'react-icons/ci';
import DeleteModal from '../../Modal/DeleteModal.tsx';
import {useHttpTabsJwt} from '../../../api/tabs/tabs.jwt.api.ts';
import {TabsDocumentProps, TabsTO} from '../../../model/tab.model.ts';
import {useHttpTabs} from '../../../api/tabs/tabs.api.ts';

const SideBarDeleteButton = ({props, onDeleteTabs}: {props: TabsDocumentProps; onDeleteTabs: (tabs: TabsDocumentProps[]) => void}) => {
    const [isToggle, setIsToggle] = useState(false);
    const {httpTabsDeleteTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();

    const handleDelete = async () => {
        try {
            const tabsTO = new TabsTO({uuid: props.uuid});
            await httpTabsDeleteTab(tabsTO);
            const updatedTabs = await httpTabsGetTabs();
            onDeleteTabs(updatedTabs);
            setIsToggle(false);
        } catch (err) {
            console.log('error deleting something');
        }
    };

    return (
        <>
            <button onClick={() => setIsToggle(true)}>
                <CiCircleMinus size={20} />
            </button>
            <DeleteModal isOpen={isToggle} onDelete={() => handleDelete()} onCancel={() => setIsToggle(false)}></DeleteModal>
        </>
    );
};

export default SideBarDeleteButton;
