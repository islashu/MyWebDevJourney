const allowedOrigins = require('../config/cors/allowedOrigins');

/* Middleware for cors to be place before calling cors*/
const credentialsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};

module.exports = credentialsMiddleware;
