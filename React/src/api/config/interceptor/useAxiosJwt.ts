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

    const resetAxiosJwtHeaders = () => {
        axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers['Authorization'] = `Bearer `;
                return config;
            },
            (error) => Promise.reject(error)
        );
    };

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
                    // Received a new access token using refresh Token
                    const refreshToken = getReduxAuthSliceRefreshToken();
                    const authTO = new AuthTO({refreshToken: refreshToken});
                    /*Received a new access token using refresh Token*/
                    const newAccessToken: string | void = await httpAuthRefresh(authTO);
                    // Typescript: we can counteract the compiler from insisting that the methods below must take in a void as a type by doing this null check.
                    if (newAccessToken) {
                        // Remove refresh token after usage
                        await setReduxAuthSliceRefreshToken('');
                        setReduxAuthSliceAccessToken(newAccessToken);
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }
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

    return {axiosPrivate, resetAxiosJwtHeaders};
};

export default useAxiosJwt;
