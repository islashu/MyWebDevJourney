import useAxiosJwt from '../config/interceptor/useAxiosJwt';
import {AuthTOProps, convertAuthTOJson} from '../../model/auth.model.ts';

/*
 * This file only contains http requests that require jwt authentication
 * */
export const useHttpAuthJwt = () => {
    const {axiosPrivate} = useAxiosJwt();

    const httpAuthJwtProtected = async () => {
        console.log('sending http protected route');
        return axiosPrivate
            .get('/auth/protected', {
                withCredentials: true
            })
            .then(
                // toast successfully registration
                (response) => {
                    console.log('response from protected route', response);
                    const authTO: AuthTOProps = convertAuthTOJson(response.data);
                    return authTO;
                }
            )
            .catch((err) => {
                console.log(err);
                console.log('Unable to access protected route');
                throw new Error('Error with connection');
            });
    };

    return {httpAuthJwtProtected};
};
