// import {UserDocumentProps} from '../models/auth.model';
import {User, UserDocumentProps} from '../models/user.model';
import {AuthTO, AuthTOProps} from '../models/auth.model';
import {BAD_REQUEST, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/codes/response.code';
import {JwtProps} from '../models/jwt.model';
import {NextFunction} from 'express';
const authUtilis = require('../util/authentication/auth');
const {createCustomLogger} = require('../util/loggers/customLogger');
const logger = createCustomLogger('userController', 'user');
const {validatePassword, issueAccessToken, issueRefreshToken} = require('../util/authentication/auth');
const jwt = require('jsonwebtoken');
import {ResponseError} from '../models/error.model';
import {UserRepositoryProps} from '../models/repository/userRepository.model';
import {AuthControllerProps} from '../models/controller/authController.model';
import {v4 as uuidv4} from 'uuid';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export class AuthController implements AuthControllerProps {
    async handleLogin(username: string, password: string, db: UserRepositoryProps): Promise<AuthTOProps> {
        if (!username || !password) throw new ResponseError(BAD_REQUEST, 'Username and password is required');

        const userFound: UserDocumentProps = await db.findByUsername(username);
        if (!userFound) throw new ResponseError(UNAUTHORISED, 'No user found with the provided login and password');

        const isMatch: boolean = await validatePassword(password, userFound.password);

        if (isMatch) {
            const accessToken = issueAccessToken(userFound, 5);
            const refreshToken = issueRefreshToken(userFound, 60 * 60 * 24);
            // Store auth isRefresh token in DB for later usage
            userFound.refreshToken = refreshToken;
            await db.save(userFound);
            // By doing this authTO controller completes the object for you.
            const tokens: AuthTOProps = {accessToken: accessToken, refreshToken: refreshToken} as AuthTOProps;

            return tokens;
        } else {
            throw new ResponseError(UNAUTHORISED, 'Internal Server Error');
        }
    }

    async handleRegister(username: string, password: string, emailAddress: string, db: UserRepositoryProps): Promise<void> {
        if (!username || !password || !emailAddress) throw new ResponseError(BAD_REQUEST, 'Username, password and email address is required');
        // Check if username already exist in DB
        const duplicate: UserDocumentProps = await db.findByUsername(username);
        if (duplicate) throw new ResponseError(CONFLICT, 'Username already exist!');

        // Create a new UserProps Mongoose Model
        const user = new User({
            uuid: uuidv4(),
            username: username,
            password: await authUtilis.genHashPassword(password),
            emailAddress: emailAddress,
            refreshToken: '',
            createdDt: new Date(),
            updatedDt: new Date()
        });

        await db.save(user);
    }

    async handleRefreshToken(refreshToken: string, db: UserRepositoryProps): Promise<string> {
        if (!refreshToken) throw new ResponseError(UNAUTHORISED, 'Missing isRefresh token!');
        const userFound: UserDocumentProps = await db.findByRefreshToken(refreshToken);
        if (!userFound) throw new ResponseError(UNAUTHORISED, 'No user found with provided isRefresh token!');

        /*
         1. Evaluate isRefresh token before assign a new longer access token, jwt verify and then insert the object into the callback function as decoded in the callback function)
         2. We then take the callback function and compare it.
        */
        let newAccessToken = '';
        await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded: JwtProps) => {
            if (err || userFound.username !== decoded.userInfo.username)
                throw new ResponseError(FORBIDDEN, 'Token details are incorrect, token could have been tempered with!');
            const accessToken: string = issueAccessToken(userFound, 60 * 60 * 24);
            // Remove isRefresh token from DB
            userFound.refreshToken = '';
            await db.save(userFound);

            newAccessToken = accessToken;
        });

        return newAccessToken;
    }

    async handleLogout(username: string, db: UserRepositoryProps): Promise<void> {
        if (!username) throw new ResponseError(BAD_REQUEST, 'Username is required to log out!');
        console.log('Logging out user: ' + username);
        const userFound: UserDocumentProps = await db.findByUsername(username);
        console.log(userFound);
        userFound.refreshToken = '';
        await db.save(userFound);
    }

    constructor() {}
}
