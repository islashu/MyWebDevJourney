import {User, UserDocument} from '../models/user.model';
import {ResponseError} from '../models/error.model';
import {UNAUTHORISED} from '../util/codes/response.code';
import {UserDatabaseProps} from '../models/database.model';
const {logger} = require('../util/loggers/defaultLogger');

export class UserDatabaseMongo implements UserDatabaseProps {
    constructor() {}
    async findById(id: string): Promise<UserDocument> {
        const user: UserDocument = await User.findOne({id: id});
        return user;
    }

    async save(user: any): Promise<void> {
        await user.save();
    }

    // Specific interfaces methods
    async findByUsername(username: string): Promise<UserDocument> {
        const user: UserDocument = await User.findOne({username: username});
        return user;
    }
    async findByRefreshToken(refreshToken: string): Promise<UserDocument> {
        const user: UserDocument = await User.findOne({refreshToken: refreshToken});
        return user;
    }
}
