/* Do you use class or controller,
 * For the most part, data objects like DTO does not require additional logic so we don't need to use a class
 * If you need to give a certain data object additional logic and methods like toString and still want to maintain that objects specificity
 * Convert the object "type/controller" to a class
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
}

/* Referring to the commented code below, we always choose the appropriate type using the controller below to model our data*/

export class AuthTO implements AuthTOProps {
    private _uuid?: string;
    private _firstName: string;
    private _lastName: string;
    private _emailAddress: string;
    private _username: string;
    private _password: string;
    private _refreshToken: string;
    private _accessToken: string;

    constructor(obj: {
        uuid?: string;
        firstName?: string;
        lastName?: string;
        emailAddress?: string;
        username?: string;
        password?: string;
        refreshToken?: string;
        accessToken?: string;
    }) {
        this._uuid = obj.uuid || '';
        this._firstName = obj.firstName || '';
        this._lastName = obj.lastName || '';
        this._emailAddress = obj.emailAddress || '';
        this._username = obj.username || '';
        this._password = obj.password || '';
        this._refreshToken = obj.refreshToken || '';
        this._accessToken = obj.accessToken || '';
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
}

/*
 * This converts the authTO JSON object from the BE, to a AuthTO object in the FE.
 *
 * Due to the getters and setters implementation in typescript, the properties have _.
 * When transferring objects via http, the object is serialised to JSON and there is not getters and setters.
 * In order to access the object properties, we have to use _ which the constructor of the new AuthTO object cannot access.
 * Normally, we can use a new constructor but due to the constraints of typescript only allowing one constructor, we cannot do that.
 * What we can only do is to create a pseudo constructor that takes in a JSON object and returns a new AuthTO object.
 *
 * Which is what this function does.
 * */
export function convertAuthTOJson(authJson: any): AuthTO {
    if (
        authJson._uuid ||
        authJson._firstName ||
        authJson._lastName ||
        authJson._emailAddress ||
        authJson._username ||
        authJson._password ||
        authJson._refreshToken ||
        authJson._accessToken
    ) {
        return new AuthTO({
            uuid: authJson._uuid,
            firstName: authJson._firstName,
            lastName: authJson._lastName,
            emailAddress: authJson._emailAddress,
            username: authJson._username,
            password: authJson._password,
            refreshToken: authJson._refreshToken,
            accessToken: authJson._accessToken
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
            accessToken: authJson.accessToken
        });
    }
}
