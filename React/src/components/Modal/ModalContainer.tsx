import React, {useEffect, useRef, useState} from 'react';

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};
const ModalContainer = ({title, isOpen, onClose, children}: Props) => {
    const dialogRef = useRef<null | HTMLDialogElement>(null);

    useEffect(() => {
        console.log(isOpen);
        if (isOpen) {
            openDialog();
        } else {
            closeDialog();
        }
    }, [isOpen]);

    const closeDialog = () => {
        onClose();
        dialogRef.current?.close();
        // onClose();
    };
    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    return (
        <>
            {/*Anything wrapped with dialog attribute can only visible using showModal() and close only, this is by design and its html specific*/}
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-300/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
                        <h1 className="text-2xl">{title}</h1>
                        <button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >
                            x
                        </button>
                    </div>
                    <div className="px-5 pb-6">
                        {children}
                        <div className="flex flex-row justify-end mt-2"></div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ModalContainer;
