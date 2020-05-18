import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

export const connectDatabase = async () => {
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
