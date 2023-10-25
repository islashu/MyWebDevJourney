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
export interface UserDocument {
    username: string;
    password: string;
    email: string;
    refreshToken: string;
    createdDT: Date;
    updatedDT: Date;
}

// The collections/table created in mongoDB is dependent this, this will also contain other attributes to better check for certain properties like "required"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
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
    }
});

/*
 * Exports the object User for usage.
 * 1st parameter of the mongoose model function determines the collection name in mongoDB
 * 2nd parameter of the mongoose model function determines what columns will the collection have
 * */
const User = mongoose.model('User', userSchema);

module.exports = {User};
