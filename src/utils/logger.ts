import winston from 'winston';
import config from '../config';

let logger: winston.Logger;

if (config.NODE_ENV === 'PRODUCTION') {
  logger = winston.createLogger({
    exitOnError: true,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
          winston.format.splat(),
          winston.format.colorize()
        ),
        level: 'info',
        handleExceptions: true,
      }),
      new winston.transports.File({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        level: 'debug',
        handleExceptions: true,
        filename: `logs/log-${new Date().toISOString().split('T')[0]}.log`,
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.simple()),
    level: 'debug',
    handleExceptions: true,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.simple()
        ),
        level: 'debug',
        handleExceptions: true,
      }),
      new winston.transports.Http({
        format: winston.format.json(),
        level: 'warn',
      }),
      new winston.transports.File({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        level: 'debug',
        handleExceptions: true,
        filename: `logs/log-${new Date().toISOString().split('T')[0]}.log`,
      }),
    ],
  });
}

const logs = () => logger;

export default logs();
