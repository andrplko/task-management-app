import { Collection, Db, Document, MongoClient, MongoError } from 'mongodb';
import { config } from 'dotenv';
import { todoSchema } from '../models/todo.model';
import { userSchema } from '../models/user.model';
import { Connection } from '../types';
import logger from '../config/logger';

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

    const [user, todo] = await Promise.all([
      await db.createCollection('user', userSchema),
      await db.createCollection('todo', todoSchema),
    ]);

    cachedClient = client;
    cachedDb = db;
    collections = {
      user,
      todo,
    };

    logger.info('Successfully connected to the database!');
    return { client, db, collections };
  } catch (error) {
    if (error instanceof MongoError) {
      logger.error(`MongoDB error: ${error.message}`);
    }

    logger.error('Failed to connect to the database');
    throw new Error('Failed to connect to the database');
  }
}
