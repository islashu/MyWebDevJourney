/*
 * You have to use "import from" and not require if you want to import controller
 * */
export interface AuthTOProps {
    uuid?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    username: string;
    password: string;
    refreshToken: string;
    accessToken: string;
    isAuthenticated?: boolean;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
}

export class AuthTO implements AuthTOProps {
    private _uuid?: string;
    private _firstName: string;
    private _lastName: string;
    private _emailAddress: string;
    private _username: string;
    private _password: string;
    private _refreshToken: string;
    private _accessToken: string;
    private _isAuthenticated?: boolean;
    private _isAdmin?: boolean;
    private _isSuperAdmin?: boolean;

    constructor(obj: {
        uuid?: string;
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
        username?: string;
        password?: string;
        refreshToken?: string;
        accessToken?: string;
        isAuthenticated?: boolean;
        isAdmin?: boolean;
        isSuperAdmin?: boolean;
    }) {
        this._uuid = obj.uuid || '';
        this._firstName = obj.firstName || '';
        this._lastName = obj.lastName || '';
        this._emailAddress = obj.emailAddress || '';
        this._username = obj.username || '';
        this._password = obj.password || '';
        this._refreshToken = obj.refreshToken || '';
        this._accessToken = obj.accessToken || '';
        this._isAuthenticated = obj.isAuthenticated || false;
        this._isAdmin = obj.isAdmin || false;
        this._isSuperAdmin = obj.isSuperAdmin || false;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    set isAdmin(value: boolean) {
        this._isAdmin = value;
    }

    get isSuperAdmin(): boolean {
        return this._isSuperAdmin;
    }

    set isSuperAdmin(value: boolean) {
        this._isSuperAdmin = value;
    }
}

export function convertAuthTOJson(authJson: any): AuthTO {
    if (
        authJson._uuid ||
        authJson._firstName ||
        authJson._lastName ||
        authJson._emailAddress ||
        authJson._username ||
        authJson._password ||
        authJson._refreshToken ||
        authJson._accessToken ||
        authJson._isAuthenticated ||
        authJson._isAdmin ||
        authJson._isSuperAdmin
    ) {
        return new AuthTO({
            uuid: authJson._uuid,
            firstName: authJson._firstName,
            lastName: authJson._lastName,
            emailAddress: authJson._emailAddress,
            username: authJson._username,
            password: authJson._password,
            refreshToken: authJson._refreshToken,
            accessToken: authJson._accessToken,
            isAuthenticated: authJson._isAuthenticated,
            isAdmin: authJson._isAdmin,
            isSuperAdmin: authJson._isSuperAdmin
        });
    } else {
        return new AuthTO({
            uuid: authJson.uuid,
            firstName: authJson.firstName,
            lastName: authJson.lastName,
            emailAddress: authJson.emailAddress,
            username: authJson.username,
            password: authJson.password,
            refreshToken: authJson.refreshToken,
            accessToken: authJson.accessToken,
            isAuthenticated: authJson.isAuthenticated,
            isAdmin: authJson.isAdmin,
            isSuperAdmin: authJson.isSuperAdmin
        });
    }
}
