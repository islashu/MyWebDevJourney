import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useHttpAuth} from '../../api/auth/auth.api';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service';
import {useHttpAuthJwt} from '../../api/auth/auth.jwt.api';
import {AuthTO, AuthTOProps} from '../../model/auth.model';
import {useForm} from 'react-hook-form';
import {Button, Fieldset, Group, PasswordInput, TextInput} from '@mantine/core';
import CustomButton from '../../components/CustomComponents/common/CustomButton/CustomButton.tsx';
import {useToast} from '../../hooks/useToast.tsx';

const LoginPage = () => {
    const navigate = useNavigate();

    const {setReduxAuthSlice, getReduxAuthSlice} = useReduxAuthSliceService();
    // Get global state from redux
    const {httpAuthLogin} = useHttpAuth();
    const {httpAuthJwtProtected} = useHttpAuthJwt();
    const {toastSuccess, toastFailure, toastLoading, updateToastLoadingToSuccess, updateToastLoadingToFailure} = useToast();
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            toastLoading('loadLogin');
            const authTO: AuthTOProps = new AuthTO({username: data.username, password: data.password});

            const {accessToken, refreshToken} = await httpAuthLogin(authTO);
            if (!accessToken || !refreshToken) throw new Error('No token received');

            // Store in redux
            await setReduxAuthSlice(true, accessToken, refreshToken, data.username, true).then(async (response) => {
                updateToastLoadingToSuccess('loadLogin', 'Login successful', 'You are now logged in!');
                navigate('/');
                setIsLoading(false);
            });
        } catch (err) {
            updateToastLoadingToFailure('loadLogin', 'Login failed', 'Please try again');
            console.log(err);
            setIsLoading(false);
        }
    };

    // // A test function
    // const handleProtectedSubmit = () => {
    //     console.log('protected submit');
    //     httpAuthJwtProtected();
    // };
    //
    // // A test function
    // const handleReduxUpdate = () => {
    //     console.log('redux auth object');
    //     console.log(getReduxAuthSlice());
    // };

    return (
        <>
            <form className=" flex h-96 w-full" onSubmit={handleSubmit(onSubmit)}>
                <Fieldset className="m-auto w-1/3 min-h-fit" legend="Sign into your account.">
                    <TextInput label="Username" placeholder="username" {...register('username', {required: true})}></TextInput>
                    {errors.username && <span className="text-red-500">This field is required</span>}

                    <PasswordInput label="Password" placeholder="password" {...register('password', {required: true})}></PasswordInput>
                    {errors.password && <span className="text-red-500">This field is required</span>}
                    <Group justify="flex-end" mt="md">
                        <CustomButton isDisabled={!isValid || isLoading} name="submit" type="submit"></CustomButton>
                    </Group>
                </Fieldset>
            </form>
        </>
    );
};

export default LoginPage;
