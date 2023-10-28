import {Link, Outlet} from 'react-router-dom';
import LoginNavBar from '../LoginNavBar/LoginNavBar';

/*We are not going to dynamically load the navbar items as an array as there is no need for it.
 * It complicates the structure as well
 *
 * Include icon at the top left hand corner
 * Include the navbar items at the top right hand corner
 * */
const NavBar = () => {
    return (
        <>
            <nav className="max-w-2xl mx-auto flex justify-between gap-3 text-2xl font-medium bg-amber-100">
                <Link to={'/'}>
                    <span>Home</span>
                </Link>
                <Link to={'/reference'}>
                    <span>Reference</span>
                </Link>
                <LoginNavBar></LoginNavBar>
            </nav>
            {/*Do not remove this*/}
            <Outlet></Outlet>
        </>
    );
};

export default NavBar;
