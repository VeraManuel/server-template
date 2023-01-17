import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(`Can't find .env file`);
}

export default {
  PORT: Number(process.env.PORT || 8080),
  NODE_ENV: process.env.NODE_ENV || 'DEVELOPMENT',
};
