import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useHttpAuth} from '../../api/auth/auth.api';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service';
import {useHttpAuthJwt} from '../../api/auth/auth.jwt.api';
import {AuthTO, AuthTOProps} from '../../model/auth.model';
import {axiosPrivate} from '../../api/config/axios.ts';
import {useForm} from 'react-hook-form';

const LoginPage = () => {
    const navigate = useNavigate();

    const {setReduxAuthSlice, getReduxAuthSlice} = useReduxAuthSliceService();
    // Get global state from redux
    const {httpAuthLogin} = useHttpAuth();
    const {httpAuthJwtProtected} = useHttpAuthJwt();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid},
        setValue,
        getValues
    } = useForm({mode: 'onTouched'});

    const onSubmit = async (data): Promise<void> => {
        // send login information as http request to BE
        try {
            // Get back an accessToken and a refreshToken to store in redux
            const authTO: AuthTOProps = new AuthTO({username: data.username, password: data.password});
            const {accessToken, refreshToken} = await httpAuthLogin(authTO);
            // Store in redux
            await setReduxAuthSlice(true, accessToken, refreshToken, data.username, true).then((response) => {
                navigate('/');
            });
        } catch (err) {
            console.log(err);
        }
        // setIsLoading((prev) => !prev);
    };

    // A test function
    const handleProtectedSubmit = () => {
        console.log('protected submit');
        httpAuthJwtProtected();
    };

    // A test function
    const handleReduxUpdate = () => {
        console.log('redux auth object');
        console.log(getReduxAuthSlice());
    };

    return (
        <>
            <form className=" flex flex-col max-w-2xl mx-auto relative p-6" onSubmit={handleSubmit(onSubmit)}>
                <label className={errors.username ? 'text-rose-700 font-bold' : ''} htmlFor="username">
                    Username:
                </label>
                <input className="border border-solid border-black" type="text" id="username" {...register('username', {required: true})} />
                {errors.username && <span>This field is required</span>}

                <label htmlFor="password" className={errors.password ? 'text-rose-700 font-bold' : ''}>
                    Password:{' '}
                </label>
                <input className="border border-solid border-black" type="password" id="password" {...register('password', {required: true})} />
                {errors.password && <span>This field is required</span>}
                <label htmlFor="submit"></label>
                <button
                    disabled={!isValid}
                    className="bg-gray-200 hover:enabled:bg-gray-300 transition duration-300 ease-in-out text-xl font-bold m-4"
                    type="submit"
                >
                    submit
                </button>
            </form>
            <div className="flex flex-col max-w-2xl mx-auto">
                <button
                    className="bg-sky-300 hover:bg-sky-500 transition duration-300 ease-in-out text-xl font-bold my-1"
                    onClick={() => {
                        handleReduxUpdate();
                    }}
                >
                    redux
                </button>
                <button
                    className="bg-sky-300 hover:bg-sky-500 transition duration-300 ease-in-out text-xl font-bold"
                    onClick={() => {
                        handleProtectedSubmit();
                    }}
                >
                    send via protected route
                </button>
            </div>
        </>
    );
};

export default LoginPage;
