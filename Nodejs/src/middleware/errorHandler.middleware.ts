/*
 * This serves several purpose which is to catch and convert every known and unknown error so that the internal mechanism of the backend is shown
 * to the public. This also allow us to no longer write try catch blocks everywhere.
 *
 * This will be the centralise errorhandling middleware which will process and convert error message thrown from every other middleware in nodejs
 * We are essentially creating modularity where we can come in and direct certain errors to different handlers in the future
 *
 * We are likely to expand on this error handler to censor out certain information and grab the key things to return to the front end.
 *
 * We may also use error codes to help streamline the errors sent to the frontend.
 * */
const errorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
    const status = err.status || 500;
    const errorObj = {
        message: err.message || 'Internal Server Error 500!'
    };

    res.status(status).json(errorObj);
};

module.exports = {errorHandlerMiddleware};
