import axios from '../config/axios';
import {AxiosResponse} from 'axios';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service';
import {useRef} from 'react';
import {AuthTO} from '../../model/auth.model.ts';

// interceptor imported form config automatically comes with BASE_URL appended

/*
 * This file only contains http requests that do not require jwt authentication
 * Note that the naming is httpAuth<action>
 *
 * There will no logic here. All associated logic will be found in the page/components side, this purely act as a "stateless" middleware to interact with
 * the BE. This is to follow angular's protocol where the http services do not contain the logic and merely calls to provide a delivery without knowing what
 * the package is.
 * */
export const useHttpAuth = () => {
    // Accessing the redux using the service

    const httpAuthRegister = async (authTO: AuthTO, controllerSignal?: AbortSignal) => {
        return axios
            .post('/auth/register', {authTO: authTO}, {signal: controllerSignal})
            .then()
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const httpAuthLogin = async (authTO: AuthTO, controllerSignal?: AbortSignal) => {
        return axios
            .post(
                '/auth/login',
                {authTO: authTO},
                {
                    signal: controllerSignal,
                    withCredentials: true // This allows cookies to work. IMPT!!
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.log(err.response.data.message);
                throw new Error('Error with connection');
            });
    };

    /*
     * This triggers the usage of the refresh token in the http header that was issued during the login process
     * refresh token will be consumed to provide a longer accessToken which is send back to the client side.
     *
     * Hence we are providing a refreshToken and receiving an access token as a response
     * */
    const httpAuthRefresh = async (authTO: AuthTO, controllerSignal?: AbortSignal): Promise<string | void> => {
        return axios
            .post('/auth/refresh', {authTO: authTO}, {signal: controllerSignal})
            .then((response) => {
                // Typescript: we can do this to let the compiler know that we are returning a string type rather than returning the response.data.accessToken immediately
                const data: string = response.data.accessToken;
                return data;
            })
            .catch((err) => {
                console.log(err.response.data.message);
                throw new Error('Error with connection');
            });
    };

    const httpAuthLogout = async (authTO: AuthTO, controllerSignal?: AbortSignal) => {
        return axios
            .post('/auth/logout', {authTO: authTO}, {signal: controllerSignal})
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                throw new Error('Error with connection');
            });
    };

    return {httpAuthRegister, httpAuthLogin, httpAuthRefresh, httpAuthLogout};
};
