import {useDispatch, useSelector} from 'react-redux';
import {setError, setIsRefresh, setSuccess} from './tabsSlice';

export const useReduxTabsSliceService = () => {
    const dispatch = useDispatch();
    const tabsSlice = useSelector((state) => state.tabsSlice);

    const setReduxTabsSliceIsSuccess = (bool: boolean) => {
        try {
            dispatch(setSuccess(bool));
        } catch (err) {
            console.log(err);
        }
    };
    const getReduxTabsSliceIsSuccess = () => {
        return tabsSlice.isSuccess;
    };
    const setReduxTabsSliceIsError = (bool: boolean) => {
        try {
            dispatch(setError(bool));
        } catch (err) {
            console.log(err);
        }
    };

    const getReduxTabsSliceIsError = () => {
        return tabsSlice.isError;
    };

    const setReduxTabsSliceIsRefresh = (bool: boolean) => {
        try {
            dispatch(setIsRefresh(bool));
        } catch (err) {
            console.log(err);
        }
    };

    const getReduxTabsSliceIsRefresh = () => {
        return tabsSlice.isRefresh;
    };

    return {
        setReduxTabsSliceIsSuccess,
        getReduxTabsSliceIsSuccess,
        setReduxTabsSliceIsError,
        getReduxTabsSliceIsError,
        setReduxTabsSliceIsRefresh,
        getReduxTabsSliceIsRefresh
    };
};
