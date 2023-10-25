import {Logger} from 'winston';

const winston = require('winston');
require('dotenv').config();
const {combine, timestamp, printf, colorize, align} = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

const createCustomLogger = (serviceName?: string, nameOfFile?: string): Logger | undefined => {
    const formattedServiceName = serviceName || '';
    const formattedNameOfFile = nameOfFile || 'log';

    const formattedTransportConfig = new DailyRotateFile({
        // Location of the logger is always from the root and not where the logger is located.
        filename: `./logs/customLogger/${formattedNameOfFile}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxFiles: '1d'
    });

    try {
        const customLogger = winston.createLogger({
            level: 'info',
            defaultMeta: {
                // Custom type of
                service: formattedServiceName
            },
            format: combine(
                colorize({all: true}),
                timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss.SSS A'
                }),
                align(),
                printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
            transports: [formattedTransportConfig]
        });

        return customLogger;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {createCustomLogger};
