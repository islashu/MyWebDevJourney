import {useDispatch, useSelector} from 'react-redux';
import {setAuthenticatedStatus, setAccessToken, setUserName, setRefreshToken, setIsAdmin, setIsSuperAdmin} from './authSlice';

/* By using this, you will findAllTabs access to a bunch of helper functions that access redux
 *  This acts as a middlewares between components <-> middlewares <-> redux
 *
 * All setter methods to start with set and or getter methods to start with findAllTabs
 * all methods to contain the word redux so we know that we are accessing redux
 * All methods to indicate the slice that they are accessing
 *
 * e.g. set-Redux-authSlice-<item>
 * */
export const useReduxAuthSliceService = () => {
    const dispatch = useDispatch();
    // @ts-ignore, Redux doesn't use types as it works with plain js objects
    const authSlice = useSelector((state) => state.authSlice);

    const setReduxAuthSliceIsAuthenticatedStatus = (bool: boolean) => {
        try {
            dispatch(setAuthenticatedStatus(bool));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSliceAccessToken = (accessToken: string) => {
        try {
            dispatch(setAccessToken(accessToken));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSliceUsername = (username: string) => {
        try {
            dispatch(setUserName(username));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSliceRefreshToken = (refreshToken: string) => {
        try {
            dispatch(setRefreshToken(refreshToken));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSliceIsAdmin = (adminStatus: boolean) => {
        try {
            dispatch(setIsAdmin(adminStatus));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSliceIsSuperAdmin = (superAdminStatus: boolean) => {
        try {
            dispatch(setIsSuperAdmin(superAdminStatus));
        } catch (err) {
            console.log(err);
        }
    };

    const setReduxAuthSlice = async (
        isAuthenticated: boolean,
        accessToken: string,
        refreshToken: string,
        username: string,
        adminStatus: boolean,
        superAdminStatus: boolean
    ) => {
        try {
            setReduxAuthSliceIsAuthenticatedStatus(isAuthenticated);
            setReduxAuthSliceAccessToken(accessToken);
            setReduxAuthSliceUsername(username);
            setReduxAuthSliceRefreshToken(refreshToken);
            setReduxAuthSliceIsAdmin(adminStatus);
            setReduxAuthSliceIsSuperAdmin(superAdminStatus);
        } catch (err) {
            console.log(err);
        }
    };

    const getReduxAuthSliceUsername = (): string => {
        return authSlice.username;
    };

    const getReduxAuthSliceRefreshToken = (): string => {
        return authSlice.refreshToken;
    };

    const getReduxAuthSliceAccessToken = (): string => {
        return authSlice.accessToken;
    };

    const getReduxAuthSliceIsUserAuthenticated = (): string => {
        return authSlice.isAuthenticated;
    };

    /* Return entire auth slice object*/
    const getReduxAuthSlice = (): string => {
        return authSlice;
    };
    const getReduxAuthSliceIsAdmin = (): string => {
        return authSlice.isAdmin;
    };

    const getReduxAuthSliceIsSuperAdmin = (): string => {
        return authSlice.isSuperAdmin;
    };

    return {
        setReduxAuthSlice,
        setReduxAuthSliceUsername,
        setReduxAuthSliceAccessToken,
        setReduxAuthSliceIsAuthenticatedStatus,
        setReduxAuthSliceRefreshToken,
        setReduxAuthSliceIsAdmin,
        setReduxAuthSliceIsSuperAdmin,
        getReduxAuthSliceUsername,
        getReduxAuthSliceRefreshToken,
        getReduxAuthSlice,
        getReduxAuthSliceAccessToken,
        getReduxAuthSliceIsUserAuthenticated,
        getReduxAuthSliceIsAdmin,
        getReduxAuthSliceIsSuperAdmin
    };
};
