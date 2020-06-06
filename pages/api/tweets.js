import Cors from 'cors';
import nextConnect from 'next-connect';
import database from '../../middleware/database.ts';
import initMiddleware from '../../middleware/init-middleware.ts';
import { getIdFromURL } from '../../utils';
import { ExistentError } from '../../middleware/error-handling.ts';
import { validateExistingStamp, scrap, storeTweet } from './helpers';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: process.env.ALLOWED_ORIGINS,
  })
);

const corsMiddleware = async (req, res, next) => {
  await cors(req, res);
  next();
};

const getTweets = async (req, res) => {
  const doc = await req.db.collection('tweets').find().toArray();
  res.json(doc);
};

const createStamp = async (req, res) => {
  try {
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
