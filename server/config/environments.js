import dotenv from 'dotenv';
dotenv.config();

const environments = {
    MONGODB_URL: process.env.MONGODB_URL,
};

export default environments;