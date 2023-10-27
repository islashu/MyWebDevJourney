import useAxiosJwt from '../interceptor/useAxiosJwt';
import axios from '../config/axios';

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
                    console.log(response);
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
