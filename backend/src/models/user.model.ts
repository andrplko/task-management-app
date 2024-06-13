import { ObjectId } from 'mongodb';

export default class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public createdAt: string,
    public id?: ObjectId
  ) {}
}

export const userSchema = {
  bsonType: 'object',
  required: ['username', 'email', 'password'],
  additionalProperties: false,
  properties: {
    _id: {
      bsonType: 'objectId',
    },
    username: {
      bsonType: 'string',
      description: "'username' is required and is a string",
    },
    email: {
      bsonType: 'string',
      description: "'email' is required and is a string",
    },
    password: {
      bsonType: 'string',
      minLength: 8,
      description:
        "'password' is required and must be a string at least 8 characters long",
    },
    createdAt: {
      bsonType: 'date',
    },
  },
};
