import dotenv from 'dotenv';

dotenv.config();

/**
 * Cors setup 
 *
 * @param {*} origin
 * @param {*} callback
 */
const corsConfig = {
  origin: (origin: any, callback: any) => {
    const arrayOfOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
    // if API call from same origin then the origin return undefined
    if (origin === undefined || arrayOfOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS header origin cannot be added'));
    }
  },
  exposedHeaders: ['X-Response-Time']
};

const environmentConfig = Object.freeze({
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  timezone: process.env.APP_TIMEZONE,
  debug: process.env.APP_DEBUG,
  logSend: process.env.APP_LOG_SEND,
  TOKEN_SECRET: process.env.TOKEN_SECRET as string,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  mongodbURL: process.env.MONGODB_URL,
  corsConfig
});

export default environmentConfig;
