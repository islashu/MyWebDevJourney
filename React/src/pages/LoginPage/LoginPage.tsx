import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useHttpAuth} from '../../api/auth/auth.api';
import {useReduxAuthSliceService} from '../../redux/slices/auth/authSlice.service';
import {useHttpAuthJwt} from '../../api/auth/auth.jwt.api';
import {AuthTO} from '../../model/auth.model';

const LoginPage = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {setReduxAuthSlice, getReduxAuthSlice} = useReduxAuthSliceService();
    // Get global state from redux
    const {httpAuthLogin} = useHttpAuth();
    const {httpAuthJwtProtected} = useHttpAuthJwt();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e): Promise<void> => {
        // setIsLoading((prev) => !prev);
        e.preventDefault();
        // send login information as http request to BE
        try {
            // Get back an accessToken and a refreshToken to store in redux
            const authTO = {
                username: username,
                password: password
            } as AuthTO;
            const {accessToken, refreshToken} = await httpAuthLogin(authTO);
            // Store in redux
            await setReduxAuthSlice(true, accessToken, refreshToken, username).then(navigate('/'));
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
            <form className=" flex flex-col max-w-2xl mx-auto relative p-6" onSubmit={(event) => handleSubmit(event)}>
                {/* Always have a label, the id of the input must be the same as the html for*/}
                <label className="" htmlFor="username">
                    Username:{' '}
                </label>
                {/*bind value to state so that we can clear it after submission*/}
                {/*Ref allows use to move the screen of the auth to focus on something we want */}
                <input
                    className="border border-solid border-black"
                    type="text"
                    id="username"
                    ref={usernameRef}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="password">Password: </label>
                <input
                    className="border border-solid border-black"
                    type="text"
                    id="password"
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="submit"></label>
                <button className="bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out text-xl font-bold m-4" type="submit">
                    {' '}
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
