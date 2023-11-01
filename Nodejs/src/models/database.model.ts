import {Promise} from 'mongoose';
import {UserDocument} from './user.model';
import {ResponseError} from './error.model';
import {UNAUTHORISED} from '../util/codes/response.code';
export interface DatabaseProps {
    // save(data: any): Promise<any>;
    // update(id: string, data: any): Promise<any>;
    // delete(id: string): Promise<any>;
    // find(id: string): Promise<any>;
}

export interface UserDatabaseProps extends DatabaseProps {
    findById(id: string): Promise<UserDocument>;
    findByRefreshToken(refreshToken: string): Promise<UserDocument>;
    findByUsername(name: string): Promise<UserDocument>;
    save(user: UserDocument): Promise<void>;
}
