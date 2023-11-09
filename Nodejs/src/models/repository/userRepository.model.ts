import {Promise} from 'mongoose';
import {UserDocumentProps} from '../user.model';
import {RepositoryProps} from './repository.model';

export interface UserRepositoryProps extends RepositoryProps {
    findByUuid(uuid: string): Promise<UserDocumentProps>;
    findByRefreshToken(refreshToken: string): Promise<UserDocumentProps>;
    findByUsername(name: string): Promise<UserDocumentProps>;
    save(user: UserDocumentProps): Promise<void>;
}
