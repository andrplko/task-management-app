import { Collection, Db, Document, MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { todoSchema } from '../models/todo.model';
import { Connection } from '../types';

config();

const connectionString = process.env.DB_CONN_STRING;
const databaseName = process.env.DB_NAME;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let collections: Record<string, Collection<Document>> | null = null;

export async function connectToDatabase(): Promise<Connection> {
  if (!connectionString) {
    throw new Error('No URI available for MongoDB connection');
  }

  if (cachedClient && cachedDb && collections) {
    return { client: cachedClient, db: cachedDb, collections };
  }

  try {
    const client: MongoClient = new MongoClient(connectionString);
    await client.connect();
    const db: Db = client.db(databaseName);

    cachedClient = client;
    cachedDb = db;
    collections = {
      todo: await db.createCollection('todo', {
        validator: {
          $jsonSchema: todoSchema,
        },
      }),
    };

    return { client, db, collections };
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
