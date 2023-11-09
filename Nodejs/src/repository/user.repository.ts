import {User, UserDocumentProps} from '../models/user.model';
import {UserRepositoryProps} from '../models/repository/userRepository.model';

export class UserRepositoryMongo implements UserRepositoryProps {
    constructor() {}
    async findByUuid(uuid: string): Promise<UserDocumentProps> {
        const user: UserDocumentProps = await User.findOne({uuid: uuid});
        return user;
    }

    async save(user: any): Promise<void> {
        await user.save();
    }

    // Specific controller methods
    async findByUsername(username: string): Promise<UserDocumentProps> {
        const user: UserDocumentProps = await User.findOne({username: username});
        return user;
    }
    async findByRefreshToken(refreshToken: string): Promise<UserDocumentProps> {
        const user: UserDocumentProps = await User.findOne({refreshToken: refreshToken});
        return user;
    }
}
