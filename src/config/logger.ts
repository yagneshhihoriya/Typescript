import * as winston from "winston";

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss.SSS' }),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, host, level, stack,
      } = info;
      let { message } = info;
      message = stack || message;
      return `${timestamp} [${host}] ${level}: ${message}`;
    }),
    winston.format.metadata(),
    winston.format.ms(),
  );

const logConfiguration = {
    format: winston.format.errors({ stack: true }),
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: logFormat,
      }),
      new winston.transports.Console({
        level: 'info',
        format: logFormat,
      }),
      new winston.transports.Console({
        level: 'error',
        format: logFormat,
      })
    ]
  };
  
  export const logger = winston.createLogger(logConfiguration);