import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { MongoError, ObjectId } from 'mongodb';
import { connection } from '../index';
import User from '../models/user.model';
import { generateAuthTokens } from '../utils/generateAuthTokens';
import { hashPassword } from '../utils/hashPassword';
import { DecodedToken } from '../types';

const signup = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.user;
    await collection.createIndex({ email: 1 }, { unique: true });
    const { username, email, password }: Partial<User> = req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    const result = await collection.insertOne(newUser);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        res
          .status(400)
          .json({ message: 'User with that email already exists' });
      }

      res.status(500).json({ message: error.message });
    }
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.user;
    const { email, password }: Partial<User> = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all the required fields' });
    }

    const user: User | null = await collection.findOne<User>({ email });
    if (!user) return res.status(404).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateAuthTokens(user._id);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    const { password: userPassword, ...userWithoutPassword } = user;

    res.status(200).json({
      user: { ...userWithoutPassword },
      accessToken,
    });
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken: string | undefined = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_KEY as string
    ) as DecodedToken;

    const collection = connection.collections.user;
    const user: User | null = await collection.findOne<User>({
      _id: new ObjectId(decoded._id),
    });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const newAccessToken = jwt.sign(
      { _id: decoded._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

const signout = async (_req: Request, res: Response) => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/auth/refresh',
  });

  res.status(200).json({
    message: 'Signed out successfully',
  });
};

export { signup, signin, refresh, signout };
