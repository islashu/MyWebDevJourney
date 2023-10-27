/*
 * You have to use "import from" and not require if you want to import interfaces
 * */
export interface AuthTO {
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    password: string;
    refreshToken: string;
    accessToken: string;
}
