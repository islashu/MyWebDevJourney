/*
 * Contains the different auth models for different processes such as authentication, registration etc
 * */

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}
