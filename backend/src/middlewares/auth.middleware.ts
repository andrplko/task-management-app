import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { connection } from '../index';
import User from '../models/user.model';
import { DecodedToken } from '../types';

interface CustomRequest extends Request {
  user?: Partial<User>;
}

config();

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ message: 'Access token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as DecodedToken;
    const collection = connection.collections.user;
    const user: User | null = await collection.findOne<User>({
      _id: new ObjectId(decoded._id),
    });

    if (!user) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ name: error.name, message: error.message });
    } else if (error instanceof Error) {
      return res.status(500).send({ message: error.message });
    }

    next(error);
  }
};
