import axios from 'axios';

const BASE_URL = 'http://localhost:9999'; // URL of Backend

/* This file contains all the necessary configuration of interceptor
 *
 * Initialise interceptor with configuration
 * Axios is configured to connect to the base url by default
 * */

/* For general purpose only, is not tagged with the JWT token which allows the auth to access protected information from the backend. */
/* Good for access routes:
 * 1. Public
 * 2. Login
 * 3. Registration
 * */
export default axios.create({
    baseURL: BASE_URL
});

// This is to be used for any routes that requires authentication first
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});
