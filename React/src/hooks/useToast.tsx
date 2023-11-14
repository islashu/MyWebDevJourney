import {notifications} from '@mantine/notifications';
import {TbCircleCheckFilled, TbBuildingBridge2, TbFaceIdError} from 'react-icons/tb';
import React from 'react';

// Mantine provides its own notification hooks similar to this as well. This just provides more flexibility and customization.
export const useToast = () => {
    const toastSuccess = (title: string, message: string) => {
        notifications.show({
            withCloseButton: true,
            autoClose: 2000,
            title: title,
            message: message,
            color: 'green',
            style: {backgroundColor: 'white'},
            loading: false
        });
    };

    const toastFailure = (title: string, message: string) => {
        notifications.show({
            withCloseButton: true,
            autoClose: 2000,
            title: title,
            message: message,
            color: 'red',
            style: {backgroundColor: 'white'},
            loading: false
        });
    };

    // If you want to use toast with promise, use this function and update function to update the toast.
    // Please assign an id here so when you update the toast later, it know which toast to update.
    const toastLoading = (id: string, title?: string, message?: string) => {
        notifications.show({
            id: id,
            loading: true,
            title: title || 'We are getting your response from the server. Please be patient',
            message: message || 'Hold on... Processing...',
            autoClose: false,
            withCloseButton: false
        });
    };

    const updateToastLoadingToSuccess = (toastIdToUpdate: string, title: string, message: string) => {
        notifications.update({
            id: toastIdToUpdate,
            color: 'green',
            title: title || 'Data was loaded',
            message: message || 'Notification will close in 2 seconds, you can close this notification now',
            icon: <TbCircleCheckFilled />,
            loading: false,
            autoClose: 2000
        });
    };

    const updateToastLoadingToFailure = (toastIdToUpdate: string, title: string, message: string) => {
        notifications.update({
            id: toastIdToUpdate,
            color: 'Red',
            title: title || '500 Internal Server Error',
            message: message || 'Notification will close in 2 seconds, you can close this notification now',
            icon: <TbFaceIdError />,
            loading: false,
            autoClose: 2000
        });
    };

    return {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure};
};
