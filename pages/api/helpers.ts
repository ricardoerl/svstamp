import { Db } from 'mongodb';

import scraper from '../../services/scraper';
import {
  DBConnectionError,
  WebScrapingError,
  StoreError,
} from '../../middleware/error-handling';
import { TweetData } from '../../types/';

export const validateExistingStamp = async (db: Db, stampId: string) => {
  console.log('[STAMP] Checking existence');
  try {
    const exists = await db.collection('tweets').findOne({ 'stamp.id': stampId });
    return !!exists;
  } catch (e) {
    throw new DBConnectionError();
  }
};

export const scrap = async (url: string, stampId: string) => {
  console.log('[STAMP] Scraping recent Stamp as Tweet');
  try {
    const data = await scraper(url);
    const tweet = {
      ...data,
      stamp: {
        id: stampId,
        url,
      },
    };
    return tweet;
  } catch (e) {
    throw new WebScrapingError();
  }
};

export const storeTweet = async (db: Db, tweet: TweetData) => {
  console.log('[STAMP] Saving Tweet');
  try {
    await db.collection('tweets').insertOne(tweet);
  } catch (e) {
    throw new StoreError();
  }
};
