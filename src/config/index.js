/**
 * Config
 */

const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  ENV_LANG: process.env.ENV_LANG,
  PORT: process.env.PORT || 5500,
  BASE_URL: process.env.BASE_URL || 5500,
  DATABASE: {
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT,
    DIALECT: "mysql",
  },
  JWT: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    ACCESS_KEY_SECRET: process.env.AWS_ACCESS_KEY_SECRET,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME
  }
}
