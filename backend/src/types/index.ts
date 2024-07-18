import jwt from 'jsonwebtoken';
import { Collection, Db, Document, MongoClient } from 'mongodb';

export interface Connection {
  client: MongoClient;
  db: Db;
  collections: Record<string, Collection<Document>>;
}

export interface DecodedToken extends jwt.JwtPayload {
  _id: string;
}
