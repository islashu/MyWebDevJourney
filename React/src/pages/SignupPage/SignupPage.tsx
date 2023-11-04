import React, {useEffect, useRef, useState} from 'react';
import {useHttpAuth} from '../../api/auth/auth.api';
import {AuthTO, AuthTOProps} from '../../model/auth.model';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as string_decoder from 'string_decoder';
import {useFormValidator} from '../../hooks/useFormValidator.ts';
import {ToastContainer, toast} from 'react-toastify';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const SignupPage = () => {
    const navigate = useNavigate();
    const {validatePassword, validateEmail} = useFormValidator();
    const {httpAuthRegister} = useHttpAuth();

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
            await toast.promise(
                async () => {
                    const result = await httpAuthRegister(user);
                    if (!result) throw new Error('Error creating user'); // TODO if receive error from server, throw error or something
                },
                {
                    pending: 'Updating tab...',
                    success: 'Tab updated successfully',
                    error: 'Error updating tab'
                }
            );

            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    const onTestSubmit = async (data: SignUpFormValues): Promise<void> => {
        console.log(data);
    };

    return (
        <>
            <div className="min-h-screen">
                <header>
                    <section className="max-w-2xl mx-auto p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-medium mx-auto">Sign up Page</h1>
                    </section>
                </header>

                <form className="items-left mx-auto flex max-w-2xl flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username" className={errors.username ? 'text-rose-700 font-bold' : ''}>
                        Username:
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="username"
                        {...register('username', {required: true})}
                        autoComplete="on"
                    />
                    <p>{errors.username && <span>This field is required</span>}</p>

                    <label htmlFor="password" className={errors.password ? 'text-rose-700 font-bold' : ''}>
                        Password:
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="password"
                        id="password"
                        autoComplete="on"
                        {...register('password', {
                            required: true,
                            validate: {
                                isValidPassword: (value) => validatePassword(value) || 'invalid Password'
                            }
                        })}
                    />
                    <p>{errors.password && <span>Password is invalid. Please Try again!</span>}</p>

                    <label htmlFor="confirmPassword" className={errors.confirmPassword ? 'text-rose-700 font-bold' : ''}>
                        Confirm Password:
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="password"
                        id="confirmPassword"
                        autoComplete="on"
                        {...register('confirmPassword', {
                            required: true,
                            validate: {
                                isValidPassword: (value) => value === getValues('password') || 'invalid confirm password'
                            }
                        })}
                    />
                    <p>{errors.confirmPassword && <span>Password are not the same.</span>}</p>

                    <label htmlFor="emailAddress" className={errors.emailAddress ? 'text-rose-700 font-bold' : ''}>
                        Email Address:{' '}
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="email"
                        id="emailAddress"
                        {...register('emailAddress', {
                            validate: {
                                isValidEmail: (value) => validateEmail(value) || 'invalid email'
                            }
                        })}
                    />
                    <p>{errors.emailAddress && <span>Email is invalid.</span>}</p>

                    <label htmlFor="submit"></label>
                    <button
                        disabled={!isValid}
                        className="border border-solid border-slate-900 text-black dark:border-none sm:text-2xl bg-gray-50 hover:enabled:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer position={'top-right'} autoClose={2000} closeOnClick={true} />
        </>
    );
};

export default SignupPage;
