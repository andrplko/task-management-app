import { ObjectId } from 'mongodb';

export default class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public _id?: ObjectId
  ) {}
}

export const userSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'username', 'email', 'password', 'createdAt'],
      additionalProperties: false,
      properties: {
        _id: { bsonType: 'objectId' },
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
    },
  },
};
