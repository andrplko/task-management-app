import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const {
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} = process.env;

const generateAuthTokens = (_id: ObjectId | undefined) => {
  const accessToken = jwt.sign({ _id }, JWT_SECRET_KEY as string, {
    expiresIn: TOKEN_EXPIRE_TIME,
  });

  const refreshToken = jwt.sign({ _id }, JWT_SECRET_REFRESH_KEY as string, {
    expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
  });

  return { accessToken, refreshToken };
};

export { generateAuthTokens };
