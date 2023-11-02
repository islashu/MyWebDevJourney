/*So that if authentication fails we can trigger a custom status 403 else passport will just default to 401 */
export const authErrorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
    const status = 403;
    const errorObj = {
        message: err.message || 'Jwt Authentication Error'
    };

    res.status(status).json(errorObj);
};
