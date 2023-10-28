import {useEffect, useRef, useState} from 'react';
import {useHttpAuth} from '../../api/auth/auth.api';
import {AuthTO} from '../../model/auth.model';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

const SignupPage = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef(null);

    const confirmPasswordRef = useRef();
    const emailAddressRef = useRef();
    const {httpAuthRegister} = useHttpAuth();
    const {isLoading, setIsLoading} = useState(false);

    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [emailAddress, setEmailAddress] = useState('');
    const [isEmailAddressValid, setIsEmailAddressValid] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        try {
            // prevent the page from reloading and unmounting the component when submitting the form (default html behaviour), this prevents state from being lost
            e.preventDefault();
            setIsLoading(true);
            // Do something
            const user = {
                username: username,
                password: password,
                emailAddress: emailAddress
            } as unknown as AuthTO;
            // if error, display the error
            await httpAuthRegister(user);
            setIsLoading(false);
        } catch (err) {
            setErrMsg('');
            errRef.current.focus;
        }
    };

    // Validate username
    useEffect(() => {
        setIsUsernameValid(USERNAME_REGEX.test(username));
    }, [username]);

    // Validate password
    useEffect(() => {
        setIsPasswordValid(PASSWORD_REGEX.test(password));
        setIsConfirmPasswordValid(password === confirmPassword);
    }, [password, confirmPassword]);

    // Validate email address
    useEffect(() => {
        setIsEmailAddressValid(EMAIL_REGEX.test(emailAddress));
    }, [emailAddress]);

    return (
        <>
            {/* TODO: add a loading overlap*/}
            <div className="min-h-screen">
                <header>
                    <section className="max-w-2xl mx-auto p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-medium mx-auto">Sign up Page</h1>
                    </section>
                </header>

                <p ref={errRef} className={errMsg ? 'visible text-rose-700 font-bold' : 'hidden'}>
                    {errMsg}
                </p>
                <form className="items-left mx-auto flex max-w-2xl flex-col gap-4 " onSubmit={(event) => handleSubmit(event)}>
                    {/* Always have a label, the id of the input must be the same as the html for*/}
                    <label htmlFor="username" className={isUsernameValid ? '' : 'text-rose-700 font-bold'}>
                        Username:{' '}
                    </label>
                    {/*bind value to state so that we can clear it after submission*/}
                    {/*Ref allows use to move the screen of the auth to focus on something we want */}
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="username"
                        ref={usernameRef}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="on"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => {
                            setUserFocus(false);
                        }}
                        required
                    />
                    <p className={!isUsernameValid && userFocus ? 'visible' : 'hidden'}>
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="password" className={isPasswordValid ? '' : 'text-rose-700 font-bold'}>
                        Password:{' '}
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="password"
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="on"
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => {
                            setPasswordFocus(false);
                        }}
                    />
                    <p className={!isPasswordValid && passwordFocus ? 'visible' : 'hidden'}>
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number and a special character.
                        <br />
                    </p>

                    <label htmlFor="confirmPassword" className={isPasswordValid && isConfirmPasswordValid ? '' : 'text-rose-700 font-bold'}>
                        Confirm Password:{' '}
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="confirmPassword"
                        ref={confirmPasswordRef}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="on"
                        required
                        onFocus={() => setConfirmPasswordFocus(true)}
                        onBlur={() => {
                            setConfirmPasswordFocus(false);
                        }}
                    />
                    <p className={!isConfirmPasswordValid || !isPasswordValid ? 'visible' : 'hidden'}>Passwords does not match</p>

                    <label htmlFor="emailAddress" className={isEmailAddressValid ? '' : 'text-rose-700 font-bold'}>
                        Email Address:{' '}
                    </label>
                    <input
                        className="w-full rounded-xl border border-solid border-slate-900 p-3 text-2xl text-black dark:border-none sm:text-3xl"
                        type="text"
                        id="email"
                        ref={emailAddressRef}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        autoComplete="on"
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => {
                            setEmailFocus(false);
                        }}
                    />
                    <p className={!isEmailAddressValid && emailFocus ? 'visible' : 'hidden'}>Please enter a valid email address</p>

                    <label htmlFor="submit"></label>
                    <button
                        disabled={!(isUsernameValid || isPasswordValid || isEmailAddressValid)}
                        className="border border-solid border-slate-900 text-black dark:border-none sm:text-2xl bg-gray-50 hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
