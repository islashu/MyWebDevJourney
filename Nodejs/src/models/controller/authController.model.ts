import {UserRepositoryProps} from '../repository/userRepository.model';
import {AuthTOProps} from '../auth.model';

export interface AuthControllerProps {
    handleLogin(username: string, password: string, db: UserRepositoryProps): Promise<AuthTOProps>;
    handleRegister(username: string, password: string, emailAddress: string, db: UserRepositoryProps): Promise<void>;
    handleRefreshToken(refreshToken: string, db: UserRepositoryProps): Promise<string>;
    handleLogout(username: string, db: UserRepositoryProps): Promise<void>;
    handleUserDetailsUpdate(username: string, isAdmin: boolean, isSuperAdmin: boolean, db: UserRepositoryProps): Promise<AuthTOProps>;
}
