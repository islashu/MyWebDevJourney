/*
 * You have to use "import from" and not require if you want to import interfaces
 * */
export interface AuthTOProps {
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    password: string;
    refreshToken: string;
    accessToken: string;
}

export class AuthTO implements AuthTOProps {
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    password: string;
    refreshToken: string;
    accessToken: string;

    constructor(obj: {
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
        username?: string;
        password?: string;
        refreshToken?: string;
        accessToken?: string;
    }) {
        this.firstName = obj.firstName || '';
        this.lastName = obj.lastName || '';
        this.emailAddress = obj.emailAddress || '';
        this.username = obj.username || '';
        this.password = obj.password || '';
        this.refreshToken = obj.refreshToken || '';
        this.accessToken = obj.accessToken || '';
    }
}
