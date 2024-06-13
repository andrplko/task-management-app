import { ObjectId } from 'mongodb';

export default class Todo {
  constructor(
    public title: string,
    public description: number,
    public status: 'To Do' | 'In Progress' | 'Done',
    public id?: ObjectId
  ) {}
}

export const todoSchema = {
  bsonType: 'object',
  required: ['title', 'description', 'status'],
  additionalProperties: false,
  properties: {
    _id: {},
    title: {
      bsonType: 'string',
      description: "'title' is required and is a string",
    },
    description: {
      bsonType: 'string',
      description: "'description' is required and is a string",
    },
    status: {
      enum: ['To Do', 'In Progress', 'Done'],
      description:
        "'status' is required and must be either To Do, In Progress, or Done",
    },
  },
};
