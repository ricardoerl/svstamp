import Cors from 'cors';
import nextConnect from 'next-connect';
import database, { DbRequest } from '../../middleware/database';
import initMiddleware from '../../middleware/init-middleware';
import { getIdFromURL } from '../../utils';
import { ExistentError } from '../../middleware/error-handling';
import { validateExistingStamp, scrap, storeTweet } from './helpers';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: process.env.ALLOWED_ORIGINS,
  })
);

const corsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  await cors(req, res);
  next();
};

const getTweets = async (req: DbRequest, res: NextApiResponse) => {
  if (req.db) {
    const doc = await req.db.collection('tweets').find().toArray();
    res.json(doc);
  }
};

const createStamp = async (req: DbRequest, res: NextApiResponse) => {
  try {
    if (req.db) {
      const body = JSON.parse(req.body);
      const { url } = body;
      const stampId = getIdFromURL(url);

      // Checking if Stamp alredy exist
      const exists = await validateExistingStamp(req.db, stampId);
      if (exists) throw new ExistentError();
      // Scraping new stamp
      const tweet = await scrap(url, stampId);

      // Insert new tweet
      await storeTweet(req.db, tweet);
      res.status(200).json({
        message: 'Stamp guardado con éxito',
        type: 'success',
        refresh: true,
      });
    }
  } catch (e) {
    res.status(e.code).json({
      description: e.description,
      message: e.message,
      type: e.type,
    });
  }
};

const handler = nextConnect();

handler.use(database);
handler.use(corsMiddleware);

handler.get(getTweets);
handler.post(createStamp);

export default handler;
