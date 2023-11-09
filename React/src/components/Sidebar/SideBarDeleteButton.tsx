import React, {useState} from 'react';
import {CiCircleMinus} from 'react-icons/ci';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal.tsx';
import {useHttpTabsJwt} from '../../api/tabs/tabs.jwt.api.ts';
import {TabsDocumentProps, TabsTO} from '../../model/tab.model.ts';
import {useHttpTabs} from '../../api/tabs/tabs.api.ts';

const SideBarDeleteButton = ({props, onDeleteTabs}: {props: TabsDocumentProps; onDeleteTabs: (tabs: TabsDocumentProps[]) => void}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const {httpTabsDeleteTab} = useHttpTabsJwt();
    const {httpTabsGetTabs} = useHttpTabs();

    const handleDelete = async () => {
        try {
            const tabsTO = new TabsTO({uuid: props.uuid});
            await httpTabsDeleteTab(tabsTO);
            const updatedTabs = await httpTabsGetTabs();
            onDeleteTabs(updatedTabs);
            setIsDeleteModalOpen(false);
        } catch (err) {
            console.log('error deleting something');
        }
    };

    return (
        <>
            <button onClick={() => setIsDeleteModalOpen(true)}>
                <CiCircleMinus size={20} />
            </button>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onDelete={() => handleDelete()}
                onCancel={() => setIsDeleteModalOpen(false)}
            ></DeleteConfirmationModal>
        </>
    );
};

export default SideBarDeleteButton;
