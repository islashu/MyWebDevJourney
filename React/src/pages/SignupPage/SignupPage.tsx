import React, {useEffect, useRef, useState} from 'react';
import {useHttpAuth} from '../../api/auth/auth.api';
import {AuthTO, AuthTOProps} from '../../model/auth.model';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as string_decoder from 'string_decoder';
import {useFormValidator} from '../../hooks/useFormValidator.ts';
import {Fieldset, Group, PasswordInput, TextInput} from '@mantine/core';
import CustomButton from '../../components/CustomMantineComponents/common/CustomButton/CustomButton.tsx';
import {notifications} from '@mantine/notifications';
import {useToast} from '../../hooks/useToast.tsx';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const SignupPage = () => {
    const navigate = useNavigate();
    const {validatePassword, validateEmail} = useFormValidator();
    const {httpAuthRegister} = useHttpAuth();
    const {toastSuccess, toastFailure, updateToastLoadingToSuccess, updateToastLoadingToFailure, toastLoading} = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid},
        setValue,
        getValues
    } = useForm({mode: 'onTouched'});

    type SignUpFormValues = {
        username: string;
        password: string;
        emailAddress: string;
    };

    const onSubmit = async (data) => {
        try {
            const user = new AuthTO({
                username: data.username,
                password: data.password,
                emailAddress: data.emailAddress
            });
            setIsLoading(true);
            toastLoading('signUpLoading');
            const result = await httpAuthRegister(user);
            if (!result) {
                updateToastLoadingToFailure('signUpLoading', 'Error creating user', 'Please try again!');
                throw new Error('Error creating user');
            }
            updateToastLoadingToSuccess('signUpLoading', 'User created', 'You can now login to verify your account!');
            navigate('/login');
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <form className=" flex h-96 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset className="m-auto w-1/3 min-h-fit" legend="Register an account">
                        <TextInput label="Username" placeholder="username" {...register('username', {required: true})}></TextInput>
                        <p>{errors.username && <span className="text-red-500">This field is required</span>}</p>

                        <PasswordInput
                            label="Password"
                            placeholder="password"
                            {...register('password', {
                                required: true,
                                validate: {
                                    isValidPassword: (value) => validatePassword(value) || 'invalid Password'
                                }
                            })}
                        ></PasswordInput>
                        <p>{errors.password && <span className="text-red-500">This field is required</span>}</p>

                        <PasswordInput
                            label="Confirm Password"
                            placeholder="password"
                            {...register('confirmPassword', {
                                required: true,
                                validate: {
                                    isValidPassword: (value) => value === getValues('password') || 'invalid confirm password'
                                }
                            })}
                        ></PasswordInput>
                        <p>{errors.confirmPassword && <span className="text-red-500">Password are not the same.</span>}</p>

                        <TextInput
                            type="email"
                            label="Email"
                            {...register('emailAddress', {
                                required: true,
                                validate: {
                                    isValidEmail: (value) => validateEmail(value) || 'invalid email'
                                }
                            })}
                        ></TextInput>
                        <p>{errors.emailAddress && <span className="text-red-500">Email is invalid.</span>}</p>

                        <Group justify="flex-end" mt="md">
                            <CustomButton isDisabled={!isValid || isLoading} name="submit" type="submit"></CustomButton>
                        </Group>
                    </Fieldset>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
