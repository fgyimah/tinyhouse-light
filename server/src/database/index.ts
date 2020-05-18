import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const url = process.env.DB_URI || 'mongodb://localhost:27017';

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //specify the database
  const db = client.db('tinyhouse-v1');

  return {
    listings: db.collection('listings'),
  };
};
