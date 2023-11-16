import {Request, Response} from 'express';
import {AuthTO, AuthTOProps, convertAuthTOJson} from '../models/auth.model';
import {AuthControllerProps} from '../models/controller/authController.model';
import {UserRepositoryProps} from '../models/repository/userRepository.model';
import {ResponseError} from '../models/error.model';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/codes/response.code';

/*
 * Note that It is the authService that is responsible for convert the data to a new authTO object.
 * The handlers should only provide the data for the above.
 * Single responsibility principle.
 * */

export const authServiceLogin = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userRepository: UserRepositoryProps
) => {
    try {
        const {username, password}: {username: string; password: string} = convertAuthTOJson(req.body.authTO) as AuthTOProps;
        const authTOProps: AuthTOProps = await authController.handleLogin(username, password, userRepository);
        if (
            !authTOProps.accessToken ||
            !authTOProps.refreshToken ||
            authTOProps.isAdmin === undefined ||
            authTOProps.isAdmin === null ||
            !authTOProps.username ||
            authTOProps.isSuperAdmin === null ||
            authTOProps.isSuperAdmin === undefined
        )
            throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!');
        const authTO: AuthTOProps = new AuthTO({
            accessToken: authTOProps.accessToken,
            refreshToken: authTOProps.refreshToken,
            isAdmin: authTOProps.isAdmin,
            username: authTOProps.username,
            isSuperAdmin: authTOProps.isSuperAdmin,
            isAuthenticated: true
        });
        console.log('authResponseTO', authTO);
        res.json(authTO);
    } catch (err) {
        // Error handler middlewares will take care of it.
        next(err);
    }
};

export const authServiceRegister = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userRepository: UserRepositoryProps
) => {
    try {
        const {username, password, emailAddress}: {username: string; password: string; emailAddress: string} = convertAuthTOJson(
            req.body.authTO
        ) as AuthTOProps;
        await authController.handleRegister(username, password, emailAddress, userRepository);
        res.sendStatus(OK);
    } catch (err) {
        // Error handler middlewares will take care of it.
        next(err);
    }
};

export const authServiceRefreshToken = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userRepository: UserRepositoryProps
) => {
    try {
        const {refreshToken}: {refreshToken: string} = convertAuthTOJson(req.body.authTO) as AuthTOProps;
        const newAccessToken: string = await authController.handleRefreshToken(refreshToken, userRepository);
        if (!newAccessToken) throw new ResponseError(UNAUTHORISED, 'Internal Server Error!');
        const authTO: AuthTOProps = new AuthTO({accessToken: newAccessToken});
        res.json(authTO);
    } catch (err) {
        // Error handler middlewares will take care of it.
        next(err);
    }
};

export const authServiceLogout = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userRepository: UserRepositoryProps
) => {
    try {
        const {username}: {username: string} = convertAuthTOJson(req.body.authTO) as AuthTOProps;
        await authController.handleLogout(username, userRepository);
        res.sendStatus(OK);
    } catch (err) {
        // Error handler middlewares will take care of it.
        next(err);
    }
};

export const authServiceUpdateUserDetails = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userRepository: UserRepositoryProps
) => {
    try {
        const {username, isAdmin, isSuperAdmin}: {username: string; isAdmin?: boolean; isSuperAdmin?: boolean} = convertAuthTOJson(
            req.body.authTO
        ) as AuthTOProps;
        const authTOProps: AuthTOProps = await authController.handleUserDetailsUpdate(username, isAdmin, isSuperAdmin, userRepository);
        const authTO: AuthTOProps = new AuthTO({
            username: authTOProps.username,
            isAdmin: authTOProps.isAdmin,
            isSuperAdmin: authTOProps.isSuperAdmin
        });
        res.json(authTO);
    } catch (err) {
        next(err);
    }
};
