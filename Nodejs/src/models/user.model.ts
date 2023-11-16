const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const validator = require('../util/forms/form.validators');

/*
 * Purpose:
 * This file contains the typescript types and the reference for mongoose to create the collections/table
 * This is similar to @COLUMN(TB_USER) in spring framework
 *
 * How to assign types to mongoose:
 * If you encounter an untyped function calls cannot be used with types error:
 *
 * */

// Pure for typings in typescript
export interface UserDocumentProps {
    uuid?: string;
    username: string;
    password: string;
    emailAddress: string;
    refreshToken: string;
    createdDT: Date;
    updatedDT: Date;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
}

export class UserDocument {
    private _uuid?: string;
    private _username: string;
    private _password: string;
    private _emailAddress: string;
    private _refreshToken: string;
    private _createdDT: Date;
    private _updatedDT: Date;
    private _isAdmin?: boolean;
    private _isSuperAdmin?: boolean;

    constructor(obj: {
        uuid?: string;
        username?: string;
        password?: string;
        emailAddress?: string;
        refreshToken?: string;
        createdDT?: Date;
        updatedDT?: Date;
        isAdmin?: boolean;
        isSuperAdmin?: boolean;
    }) {
        this._uuid = obj.uuid || '';
        this._username = obj.username || '';
        this._password = obj.password || '';
        this._emailAddress = obj.emailAddress || '';
        this._refreshToken = obj.refreshToken || '';
        this._createdDT = obj.createdDT || new Date();
        this._updatedDT = obj.updatedDT || new Date();
        this._isAdmin = obj.isAdmin || false;
        this._isSuperAdmin = obj.isSuperAdmin || false;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get emailAddress(): string {
        return this._emailAddress;
    }

    set emailAddress(value: string) {
        this._emailAddress = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    get createdDT(): Date {
        return this._createdDT;
    }

    set createdDT(value: Date) {
        this._createdDT = value;
    }

    get updatedDT(): Date {
        return this._updatedDT;
    }

    set updatedDT(value: Date) {
        this._updatedDT = value;
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

// The collections/table created in mongoDB is dependent this, this will also contain other attributes to better check for certain properties like "required"
const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        immutable: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        unique: true,
        lowercase: true
        // validate: {
        //     validator: (email) => validator.isValidEmail(email),
        //     message: 'Email is invalid!'
        // }
    },
    refreshToken: {
        type: String
    },
    createdDt: {
        type: Date,
        immutable: true
    },
    updatedDt: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    }
});

/*
 * Exports the object UserProps for usage.
 * 1st parameter of the mongoose model function determines the collection name in mongoDB
 * 2nd parameter of the mongoose model function determines what columns will the collection have
 * */
export const User = mongoose.model('User', userSchema);

module.exports = {User};
