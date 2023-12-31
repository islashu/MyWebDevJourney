import {authErrorHandlerMiddleware} from '../middlewares/authErrorHandler.middleware';
import {
    authServiceLogin,
    authServiceLogout,
    authServiceRefreshToken,
    authServiceRegister,
    authServiceUpdateUserDetails
} from '../services/authService';
import {AuthControllerProps} from '../models/controller/authController.model';
import {AuthController} from '../controllers/authController';
import {Request, Response} from 'express';
import {UserRepositoryProps} from '../models/repository/userRepository.model';
import {UserRepositoryMongo} from '../repository/user.repository';

const express = require('express');
const router = express.Router();
const passport = require('passport');

/*
 * All routes relating to auth is below
 * Router is a sub application to app, so it will have all the functionalities of app
 *
 * Current relativePath: /auth/<relativePath>

 * The reason why it is written like this is so that we can follow the clean code architecture,
 * we want to dependency inject the require dependencies into the functions so that we isolate the components (decoupling)
 * and eventually swap them out easily without changing much code
 * Right now if I want to use a AuthControllerProps v2, I swap out AuthControllerProps v1 with AuthControllerProps v2 and it will work
 * If I want to change the repository from mongo to SQL, we can just pass it as a parameter as well and it will work
 *
 * As long as the parameter you are passing in is of the same type (implemented the same interface) it will work
 * Implementing the same interface will force the new class to implement the same methods as the old class.
 * Those class will guarantee to have those methods. Thats why there is no need to change the method called
 * like handleLogin, because v1 and v2 of the authController will have the same method name.
 *
 * You want to tailor the application of clean code architecture to your needs, you don't have to follow it strictly.
 * Apply to things that may change often.
 *
 * The issue is that as the project grows, your methods will contain alot of DI which is going to be very messy
 *  */
const authController: AuthControllerProps = new AuthController();
const userRepositoryMongo: UserRepositoryProps = new UserRepositoryMongo();
router.post('/login', (req: Request, res: Response, next: any) => {
    return authServiceLogin(req, res, next, authController, userRepositoryMongo);
});

router.post('/register', (req: Request, res: Response, next: any) => {
    return authServiceRegister(req, res, next, authController, userRepositoryMongo);
});

router.post('/refresh', (req: Request, res: Response, next: any) => {
    return authServiceRefreshToken(req, res, next, authController, userRepositoryMongo);
});

router.post('/logout', (req: Request, res: Response, next: any) => {
    return authServiceLogout(req, res, next, authController, userRepositoryMongo);
});

router.post(
    '/updateUserDetails',
    [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware],
    (req: Request, res: Response, next: any) => {
        return authServiceUpdateUserDetails(req, res, next, authController, userRepositoryMongo);
    }
);

// Test route: This work if you include the bearer
router.get('/protected', [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware], (req, res, next) => {
    res.status(200).json({success: true, msg: 'You are successfully authenticated to this route!'});
});

module.exports = router;
