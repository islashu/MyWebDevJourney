const express = require('express');
const router = express.Router();
const {login, register, handleRefreshToken} = require('../controllers/userController');
const passport = require('passport');

/*
 * All routes relating to user is below
 * Router is a sub application to app, so it will have all the functionalities of app
 *
 * Current path: /user/<path>
 *  */
router.post('/login', login);

router.post('/register', register);

router.get('/refresh', handleRefreshToken);

// Test route: This work if you include the bearer
router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({success: true, msg: 'You are successfully authenticated to this route!'});
});

module.exports = router;
