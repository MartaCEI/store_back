import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

export const URL = `${DOMAIN}:${PORT}`;

export const DB = process.env.MONGO_URI;