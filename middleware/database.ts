import { MongoClient, Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export type DbRequest = NextApiRequest & {
  db?: Db;
  dbClient?: MongoClient;
};

const client = new MongoClient(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req: DbRequest, res: NextApiResponse, next: Function) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGODB_DATABASE);
  return next();
}

export default database;
