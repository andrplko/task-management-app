import { Request, Response } from 'express';
import { MongoError, ObjectId } from 'mongodb';
import { connection } from './../index';
import User from '../models/user.model';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const collection = connection.collections.user;
    const users: User[] = await collection.find<User>({}).toArray();
    const usersWithoutPassword = users.map((user: User) => {
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword };
    });

    res.status(200).send(usersWithoutPassword);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).send({ message: error.message });
    }
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.user;
    const query = { _id: new ObjectId(req.params.id) };
    const user: User | null = await collection.findOne<User>(query);

    if (!user) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    const { password, ...userWithoutPassword } = user;
    res.status(200).send(userWithoutPassword);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).send({ message: error.message });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.user;
    const query = { _id: new ObjectId(req.params.id) };
    const updatedUser: Partial<User> = req.body;

    const user = await collection.updateOne(query, { $set: updatedUser });
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).send({ message: error.message });
    }
  }
};
