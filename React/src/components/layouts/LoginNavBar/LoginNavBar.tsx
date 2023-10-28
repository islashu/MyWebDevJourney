import CustomButton from '../../CustomButton/CustomButton';
import {Link} from 'react-router-dom';
import {useReduxAuthSliceService} from '../../../redux/slices/auth/authSlice.service';
import {useHttpAuth} from '../../../api/auth/auth.api';
import useAxiosJwt from '../../../api/interceptor/useAxiosJwt';
import {AuthTO} from '../../../model/auth.model';

const LoginNavBar = () => {
    const {getReduxAuthSliceIsUserAuthenticated, getReduxAuthSliceUsername, setReduxAuthSlice} = useReduxAuthSliceService();
    const isUserAuthenticated = getReduxAuthSliceIsUserAuthenticated();
    const {httpAuthLogout} = useHttpAuth();
    const {resetAxiosJwtHeaders} = useAxiosJwt();
    const username = getReduxAuthSliceUsername();

    const handleLogOut = async () => {
        // Provide username so BE can remove refreshToken if exist in the backend
        const authTO = {username: username} as AuthTO;
        await httpAuthLogout(authTO);
        // Remove everything from redux
        await setReduxAuthSlice(false, '', '', '');
        // Reset header because the accessToken will still be tagged to it
        resetAxiosJwtHeaders();
    };

    return (
        <>
            {isUserAuthenticated ? (
                <>
                    <span>
                        <b>WELCOME! {username}</b>
                    </span>
                    <CustomButton onClick={() => handleLogOut()} buttonName={'Log Out'} />
                    <span>
                        <Link to={'/login'}>
                            <span>Login</span>
                        </Link>
                        <Link to={'/signup'}>
                            <span>Sign up</span>
                        </Link>
                    </span>
                </>
            ) : (
                <span className="flex justify-between gap-4 border border-solid border-black">
                    <Link to={'/login'}>
                        <span>Login</span>
                    </Link>
                    <Link to={'/signup'}>
                        <span>Sign up</span>
                    </Link>
                </span>
            )}
        </>
    );
};

export default LoginNavBar;
