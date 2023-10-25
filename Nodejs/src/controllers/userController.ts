// import {UserDocument} from '../models/user.model';
import {UserDocument} from '../models/user.model';
import {FORBIDDEN, INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/codes/response.code';
import {JwtObject} from '../models/jwt.model';
const authUtilis = require('../util/authentication/auth');
const {User} = require('../models/user.model');
const {createCustomLogger} = require('../util/loggers/customLogger');
const logger = createCustomLogger('userController', 'user');
const {validatePassword, issueAccessToken, issueRefreshToken} = require('../util/authentication/auth');
const {getUniqueUserByUsername, saveUserIntoDB, getUniqueUserByField} = require('../repository/user.repository');
const jwt = require('jsonwebtoken');

/*Contains the logic for the user routes
 *
 * */
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
/*
 *
 *
 * */
const login = async (req: any, res: any, next: any) => {
    try {
        const {username, password}: {username: string; password: string} = req.body;
        if (!username || !password) return res.status(400).json({message: 'Username and password is required'});

        const userFound: UserDocument = await getUniqueUserByUsername(username);
        if (!userFound) return res.status(401).json({message: 'No such user in db!'});

        const isMatch: boolean = await validatePassword(req.body.password, userFound.password);

        if (isMatch) {
            const accessToken = issueAccessToken(userFound);
            const refreshToken = issueRefreshToken(userFound, 60 * 60 * 24);
            // Store user refresh token in DB for later usage
            userFound.refreshToken = refreshToken;
            await saveUserIntoDB(userFound);

            // Store and send back the access and refresh tokens in http header for refresh and json for accessToken
            res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
            res.json({accessToken});
        } else {
            res.sendStatus(UNAUTHORISED);
        }
    } catch (err) {
        logger.info('Something when wrong when logging in');
        logger.info(err);
        return res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

/*
 *
 * */
const register = async (req: any, res: any, next: any) => {
    const {username, password, email}: {username: string; password: string; email: string} = req.body;

    // Check if username already exist in DB
    const duplicate = await getUniqueUserByUsername(username);
    if (duplicate) return res.status(409).json({message: 'Username already exist!'});

    // Save in DB
    try {
        // Create a new User Mongoose Model
        const user = new User({
            username: username,
            password: await authUtilis.genHashPassword(password),
            email: email,
            createdDT: new Date(),
            updatedDT: new Date()
        });
        await saveUserIntoDB(user);
        return res.sendStatus(OK);
    } catch (err) {
        logger.info('Error saving object into DB');
        return res.status(INTERNAL_SERVER_ERROR).json({message: '500 Internal Error.'});
    }
};

const handleRefreshToken = async (req: any, res: any, next: any) => {
    const cookies = req.cookies;
    // Refers to jwt field in the above login functions
    if (!cookies?.jwt) return res.sendStatus(UNAUTHORISED);
    const refreshToken: string = cookies.jwt;
    const userFound: UserDocument = await getUniqueUserByField('refreshToken', refreshToken);
    if (!userFound) return res.sendStatus(FORBIDDEN);

    // Evaluate refresh token before assign a new longer access token, jwt verify and then insert the object into the callback function as decoded in the callback function)
    // We then take the callback function and compare it.
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded: JwtObject) => {
        if (err || userFound.username !== decoded.userInfo.username) return res.sendStatus(FORBIDDEN);
        const accessToken = issueAccessToken(userFound, 60 * 60 * 24);
        res.json({accessToken}); // Return json object with no status code
    });
};

module.exports = {login, register, handleRefreshToken};
