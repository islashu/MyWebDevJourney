import {testMiddleware} from '../middleware/test.middleware';
import {authErrorHandlerMiddleware} from '../middleware/authErrorHandler.middleware';

const express = require('express');
const router = express.Router();
const {handleLogin, handleRegister, handleRefreshToken, handleLogout} = require('../controllers/authController');
const passport = require('passport');

/*
 * All routes relating to auth is below
 * Router is a sub application to app, so it will have all the functionalities of app
 *
 * Current path: /auth/<path>
 *  */
router.post('/login', handleLogin);

router.post('/register', handleRegister);

router.post('/refresh', handleRefreshToken);

router.post('/logout', handleLogout);

// Test route: This work if you include the bearer
router.get('/protected', [passport.authenticate('jwt', {session: false, failWithError: true}), authErrorHandlerMiddleware], (req, res, next) => {
    res.status(200).json({success: true, msg: 'You are successfully authenticated to this route!'});
});

module.exports = router;
