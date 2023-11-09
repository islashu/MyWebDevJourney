import {axiosPrivate} from '../axios.ts';
import {useEffect} from 'react';
import {useReduxAuthSliceService} from '../../../redux/slices/auth/authSlice.service.ts';
import {useHttpAuth} from '../../auth/auth.api.ts';
import {useSelector} from 'react-redux';
import {AuthTO, AuthTOProps} from '../../../model/auth.model.ts';
import {AxiosResponse} from 'axios';

const useAxiosJwt = () => {
    const {httpAuthRefresh} = useHttpAuth();
    const {getReduxAuthSliceAccessToken, setReduxAuthSliceAccessToken, getReduxAuthSliceRefreshToken, setReduxAuthSliceRefreshToken} =
        useReduxAuthSliceService();
    let accessToken = getReduxAuthSliceAccessToken();

    useEffect(() => {
        console.log('running use interceptor jwt');
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    /* When sending a request that requires jwt authentication, we will need to ensure that the jwt token is in the header
                     * This automatically sets the jwt token in the header if it does not exist in the header
                     *
                     * Note that the interceptors will always take the latest access token in redux, so when the user logs out,
                     * we expect the header to be updated to the '' but it only does so if the user make another protected request
                     * if the user does not, the access token will still be present in the header which make the user vulnerable to JS
                     * crawling of the access token
                     * */
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    // Getting the store isRefresh token given during the initialise authentication
                    const refreshToken = getReduxAuthSliceRefreshToken();
                    const authTO = new AuthTO({refreshToken: refreshToken});
                    /*Received a new access token using isRefresh Token*/
                    const newAccessToken: string | void = await httpAuthRefresh(authTO);
                    // Typescript: we can counteract the compiler from insisting that the methods below must take in a void as a type by doing this null check.
                    /*
                     * We want to prevent removing the isRefresh token from redux if the new access token is not received. That's why we are checking for a new access token.
                     * */
                    if (newAccessToken) {
                        // Remove isRefresh token after usage
                        console.log('Adding new access token to redux and axios header');
                        setReduxAuthSliceRefreshToken('');
                        setReduxAuthSliceAccessToken(newAccessToken);
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
                    // Retry the request with the new access token
                    console.log('Retrying request with new access token');
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken]);

    return {axiosPrivate};
};

export default useAxiosJwt;
