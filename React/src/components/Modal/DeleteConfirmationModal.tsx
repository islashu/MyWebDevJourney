import React, {useEffect, useRef} from 'react';
import ModalContainer from './ModalContainer.tsx';
import {isPending} from '@reduxjs/toolkit';

interface Props {
    isOpen: boolean;
    onDelete: () => void;
    onCancel: () => void;
}
const DeleteConfirmationModal = ({isOpen, onDelete, onCancel}: Props) => {
    const dialogRef = useRef<null | HTMLDialogElement>(null);

    useEffect(() => {
        console.log(isOpen);
        if (isOpen) {
            openDialog();
        }
    }, [isOpen]);
    const closeDialog = () => {
        dialogRef.current?.close();
    };
    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleDelete = () => {
        onDelete();
        closeDialog();
    };

    const handleCancel = () => {
        onCancel();
        closeDialog();
    };

    return (
        <>
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-300/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
                        <h1 className="text-2xl">Are you sure you want to continue deleting this item. This will be permanently deleted.</h1>
                        <button
                            onClick={() => handleCancel()}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >
                            x
                        </button>
                    </div>
                    <div className="flex flex-row justify-end mt-2">
                        <button onClick={() => handleDelete()} className="py-1 px-2 rounded border-none bg-red-600">
                            Delete
                        </button>
                    </div>
                    <div className="flex flex-row justify-end mt-2">
                        <button onClick={() => handleCancel()} className="py-1 px-2 rounded border-none bg-blue-600">
                            Cancel
                        </button>
                    </div>
                    <div className="px-5 pb-6">
                        <div className="flex flex-row justify-end mt-2"></div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default DeleteConfirmationModal;
