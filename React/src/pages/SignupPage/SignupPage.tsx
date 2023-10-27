import React, {useRef, useState} from 'react';
import {useHttpAuth} from '../../api/auth/auth.api';
import {AuthTO} from '../../model/auth.model';

const SignupPage = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailAddressRef = useRef();
    const {httpAuthRegister} = useHttpAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const handleSubmit = async (e) => {
        // prevent the page from reloading and unmounting the component when submitting the form (default html behaviour), this prevents state from being lost
        e.preventDefault();
        // Do something
        const user = {
            username: username,
            password: password,
            emailAddress: emailAddress
        } as AuthTO;
        await httpAuthRegister(user);
    };

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                {/* Always have a label, the id of the input must be the same as the html for*/}
                <label htmlFor="username">Username: </label>

                {/*bind value to state so that we can clear it after submission*/}
                {/*Ref allows use to move the screen of the auth to focus on something we want */}
                <input type="text" id="username" ref={usernameRef} onChange={(e) => setUsername(e.target.value)} autoComplete="on" required />

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} autoComplete="on" required />

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="text"
                    id="confirmPassword"
                    ref={confirmPasswordRef}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="on"
                    required
                />

                <label htmlFor="emailAddress">Email Address: </label>
                <input type="text" id="email" ref={emailAddressRef} onChange={(e) => setEmailAddress(e.target.value)} autoComplete="on" required />

                <label htmlFor="submit"></label>
                <input type="submit" />
            </form>
        </>
    );
};

export default SignupPage;
