import { Collection, Db, Document, MongoClient } from 'mongodb';

export interface Connection {
  client: MongoClient;
  db: Db;
  collections: Record<string, Collection<Document>>;
}
