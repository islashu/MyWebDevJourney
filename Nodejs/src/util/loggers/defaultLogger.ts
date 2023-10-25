const winston = require('winston');
require('dotenv').config();
const {combine, timestamp, printf, colorize, align} = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

/*
 * Winston is a all in one logger allowing for multiple customisations on how certain information is logged
 * Use logger.info() to call the logger
 *
 * */

/*
 Configuration
 1. transports defines storage locations
*/
const defaultNameOfFile: string = 'test';

const defaultDailyTransportConfig = new DailyRotateFile({
    filename: `./logs/defaultLogger/${defaultNameOfFile}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '1d'
});

// Initialisation
const defaultLogger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        // Custom type of
        service: ''
    },
    format: combine(
        colorize({all: true}),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [defaultDailyTransportConfig]
});

module.exports = {defaultLogger};
