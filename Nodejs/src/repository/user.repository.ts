import {UserDocument} from '../models/user.model';
const {User} = require('../models/user.model');
const {logger} = require('../util/loggers/defaultLogger');

const getUniqueUserByUsername = async (name): Promise<UserDocument> => {
    try {
        return await User.findOne({username: name});
    } catch (err) {
        logger.info('Error with retrieving auth by username from database');
        logger.info(err);
    }
};

const getUniqueUserByRefreshToken = async (fieldVal): Promise<UserDocument> => {
    try {
        return await User.findOne({refreshToken: fieldVal});
    } catch (err) {
        logger.info('Error with retrieving auth by username from database');
        logger.info(err);
    }
};

const saveUserIntoDB = async (user) => {
    try {
        return await user.save();
    } catch (err) {
        logger.info('Error with save auth by username from database');
        logger.info(err);
    }
};

module.exports = {getUniqueUserByUsername, saveUserIntoDB, getUniqueUserByRefreshToken};
