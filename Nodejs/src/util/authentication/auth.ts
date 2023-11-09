import {UserDocumentProps} from '../../models/user.model';
import {JwtProps} from '../../models/jwt.model';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*Payload*/
const options: object = {expiresIn: 60 * 15};

/*
 * Generate a hashed password based on the HS256 algorithmn, note that the same password may generate a different hash
 * each time due to the a variable salt added to each generate. Please only use bcrypt compare to check the password
 * */
const genHashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

/*
 * Note that for bcrypt.compare to work, it has to accept the plain text as the first param
 * and hashedPassword as the second, exclusively in that order to work
 * */
const validatePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

/*
 * When signing token, you will need the following information:
 * 1. information to pass
 * 2. secret key
 * 3. expiryIn (Do not change the key value)
 *
 * // Store the following settings properly
 * */
const issueAccessToken = (userFound: UserDocumentProps, expiresIn?: number): string => {
    const payload: JwtProps = {
        userInfo: {
            username: userFound.username
        }
    };
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        expiresIn ? {expiresIn: expiresIn} : {expiresIn: 60 * 15} // a default time is provided if no expiry time is provided
        // measured in seconds
    );
};

/*
 * This will generate a isRefresh token that is provided to the auth and also stored in the DB at the time of login
 * When the first access token expires, the auth will provide the isRefresh token and the server will compare the isRefresh token in the DB
 * if both token are the same, a new access token with a longer expiry date is provided.
 * */
const issueRefreshToken = (foundUser: UserDocumentProps, expiresIn?: number) => {
    const payload: JwtProps = {
        userInfo: {
            username: foundUser.username
        }
    };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, expiresIn ? {expiresIn: expiresIn} : {expiresIn: 60 * 15});
};

module.exports = {genHashPassword, validatePassword, issueAccessToken, issueRefreshToken};
