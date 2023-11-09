import useAxiosJwt from '../config/interceptor/useAxiosJwt.ts';
import {TabsTOProps} from '../../model/tab.model.ts';

export const useHttpTabsJwt = () => {
    const {axiosPrivate} = useAxiosJwt();

    const httpTabsCreateNewTab = async (tabsTO: TabsTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .post('/tabs/create', {tabsTO: tabsTO}, {signal: controllerSignal})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                throw new Error('Unable to create new tab');
            });
    };

    const httpTabsUpdateTab = async (tabsTO: TabsTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .put('/tabs/update', {tabsTO: tabsTO}, {signal: controllerSignal})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                throw new Error('Unable to update new tab');
            });
    };

    const httpTabsDeleteTab = async (tabsTO: TabsTOProps, controllerSignal?: AbortSignal): Promise<boolean> => {
        return await axiosPrivate
            .delete('/tabs/delete', {data: {tabsTO: tabsTO}, signal: controllerSignal, withCredentials: true})
            .then((response) => {
                return true;
            })
            .catch((err) => {
                throw new Error('Unable to delete new tab');
            });
    };

    return {httpTabsCreateNewTab, httpTabsUpdateTab, httpTabsDeleteTab};
};
