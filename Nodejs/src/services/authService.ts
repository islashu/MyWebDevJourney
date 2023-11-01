import {Request, Response} from 'express';
import {AuthTOProps} from '../models/auth.model';
import {AuthControllerHandler} from '../controllers/authController';
import {AuthControllerProps} from '../models/interfaces/authController.model';
import {UserDatabaseProps} from '../models/database.model';
import {UserDatabaseMongo} from '../repository/user.repository';
import {ResponseError} from '../models/error.model';
import {INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/codes/response.code';

// Pseudo DI this handler into the functions because we can't DI into it directly yet

export const authServiceLogin = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userDatabase: UserDatabaseProps
) => {
    try {
        const {username, password}: {username: string; password: string} = req.body.authTO as AuthTOProps;
        console.log(username);
        const authResponseTO: AuthTOProps = await authController.handleLogin(username, password, userDatabase);
        console.log(authResponseTO);
        if (!authResponseTO) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!');
        res.json(authResponseTO);
    } catch (err) {
        // Error handler middleware will take care of it.
        next(err);
    }
};

export const authServiceRegister = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userDatabase: UserDatabaseProps
) => {
    try {
        console.log('authServiceRegister');
        console.log(req.body);
        const {username, password, emailAddress}: {username: string; password: string; emailAddress: string} = req.body.authTO as AuthTOProps;
        await authController.handleRegister(username, password, emailAddress, userDatabase);
        res.sendStatus(OK);
    } catch (err) {
        // Error handler middleware will take care of it.
        next(err);
    }
};

export const authServiceRefreshToken = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userDatabase: UserDatabaseProps
) => {
    try {
        const {refreshToken}: {refreshToken: string} = req.body.authTO as AuthTOProps;
        const authResponseTO: AuthTOProps = await authController.handleRefreshToken(refreshToken, userDatabase);
        if (!authResponseTO) throw new ResponseError(UNAUTHORISED, 'Internal Server Error!');
        res.json(authResponseTO);
    } catch (err) {
        // Error handler middleware will take care of it.
        next(err);
    }
};

export const authServiceLogout = async (
    req: Request,
    res: Response,
    next: any,
    authController: AuthControllerProps,
    userDatabase: UserDatabaseProps
) => {
    try {
        const {username}: {username: string} = req.body.authTO as AuthTOProps;
        await authController.handleLogout(username, userDatabase);
        res.sendStatus(OK);
    } catch (err) {
        // Error handler middleware will take care of it.
        next(err);
    }
};
