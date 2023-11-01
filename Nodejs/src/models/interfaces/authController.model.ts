import {UserDatabaseProps} from '../database.model';
import {AuthTOProps} from '../auth.model';

export interface AuthControllerProps {
    handleLogin(username: string, password: string, db: UserDatabaseProps): Promise<AuthTOProps>;
    handleRegister(username: string, password: string, emailAddress: string, db: UserDatabaseProps): Promise<void>;
    handleRefreshToken(refreshToken: string, db: UserDatabaseProps): Promise<AuthTOProps>;
    handleLogout(username: string, db: UserDatabaseProps): Promise<void>;
}
