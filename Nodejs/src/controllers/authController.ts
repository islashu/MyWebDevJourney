// import {UserDocument} from '../models/auth.model';
import {UserDocument} from '../models/user.model';
import {AuthTO} from '../models/auth.model';
import {BAD_REQUEST, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/codes/response.code';
import {JwtObject} from '../models/jwt.model';
import {NextFunction} from 'express';
const authUtilis = require('../util/authentication/auth');
const {User} = require('../models/user.model');
const {createCustomLogger} = require('../util/loggers/customLogger');
const logger = createCustomLogger('userController', 'user');
const {validatePassword, issueAccessToken, issueRefreshToken} = require('../util/authentication/auth');
const {getUniqueUserByUsername, saveUserIntoDB, getUniqueUserByRefreshToken} = require('../repository/user.repository');
const jwt = require('jsonwebtoken');
const {ResponseError} = require('../models/error.model');
import {Request, Response} from 'express';

/*Contains the logic for the auth routes
 *
 * */
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
/*
 *
 *
 * */
const handleLogin = async (req: Request, res: Response, next: any) => {
    try {
        const authTO = req.body.authTO as AuthTO;
        const username: string = authTO.username;
        const password: string = authTO.password;

        if (!username || !password) throw new ResponseError(BAD_REQUEST, 'Username and password is required');

        const userFound: UserDocument = await getUniqueUserByUsername(username);
        if (!userFound) throw new ResponseError(UNAUTHORISED, 'No user found with the provided login and password');

        const isMatch: boolean = await validatePassword(password, userFound.password);

        if (isMatch) {
            const accessToken = issueAccessToken(userFound, 5);
            const refreshToken = issueRefreshToken(userFound, 60 * 60 * 24);
            // Store auth refresh token in DB for later usage
            userFound.refreshToken = refreshToken;
            await saveUserIntoDB(userFound);
            res.json({accessToken, refreshToken});
        } else {
            throw new ResponseError(UNAUTHORISED, 'Internal Server Error');
        }
    } catch (err) {
        next(err);
    }
};

/*
 *
 * */
const handleRegister = async (req: Request, res: Response, next: any) => {
    try {
        const authTO = req.body.authTO as AuthTO;
        const username: string = authTO.username;
        const password: string = authTO.password;
        const emailAddress: string = authTO.emailAddress;

        // Check if username already exist in DB
        const duplicate = await getUniqueUserByUsername(username);
        if (duplicate) throw new ResponseError(CONFLICT, 'Username already exist!');

        // Save in DB

        // Create a new User Mongoose Model
        const user = new User({
            username: username,
            password: await authUtilis.genHashPassword(password),
            emailAddress: emailAddress,
            createdDT: new Date(),
            updatedDT: new Date()
        });
        await saveUserIntoDB(user);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};

const handleRefreshToken = async (req: Request, res: Response, next: any) => {
    try {
        const authTO = req.body.authTO as AuthTO;
        const refreshToken: string = authTO.refreshToken;

        if (!refreshToken) throw new ResponseError(UNAUTHORISED, 'Missing refresh token!');
        const userFound: UserDocument = await getUniqueUserByRefreshToken(refreshToken);
        if (!userFound) throw new ResponseError(UNAUTHORISED, 'No user found with provided refresh token!');

        // Evaluate refresh token before assign a new longer access token, jwt verify and then insert the object into the callback function as decoded in the callback function)
        // We then take the callback function and compare it.
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded: JwtObject) => {
            if (err || userFound.username !== decoded.userInfo.username)
                throw new ResponseError(FORBIDDEN, 'Token details are incorrect, token could have been tempered with!');
            const accessToken: string = issueAccessToken(userFound, 60 * 60 * 24);
            console.log(accessToken);
            res.json({accessToken});
            // Remove refresh token from DB
            userFound.refreshToken = '';
            saveUserIntoDB(userFound);
        });
    } catch (err) {
        next(err);
    }

    // Remove refresh token from DB
};

const handleLogout = async (req: Request, res: Response, next: any) => {
    try {
        const authTO = req.body.authTO as AuthTO;
        const username: string = authTO.username;

        if (!username) throw new ResponseError(BAD_REQUEST, 'Username is required to log out!');
        const userFound: UserDocument = await getUniqueUserByUsername(username);
        userFound.refreshToken = '';
        await saveUserIntoDB(userFound);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};

module.exports = {handleLogin, handleRegister, handleRefreshToken, handleLogout};
