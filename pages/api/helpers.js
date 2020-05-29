import scraper from '../../services/scraper';
import {
  DBConnectionError,
  WebScrapingError,
  StoreError,
} from '../../middleware/error-handling';

export const validateExistingStamp = async (db, stampId) => {
  console.log('[STAMP] Checking existence');
  try {
    const exists = await db.collection('tweets').findOne({ 'stamp.id': stampId });
    return !!exists;
  } catch (e) {
    throw new DBConnectionError();
  }
};

export const scrap = async (url, stampId) => {
  console.log('[STAMP] Scraping recent Stamp as Tweet');
  try {
    const data = await scraper(url);
    const tweet = {
      ...data,
      saved_at: Date.now(),
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

export const storeTweet = async (db, tweet) => {
  console.log('[STAMP] Saving Tweet');
  try {
    await db.collection('tweets').insertOne(tweet);
  } catch (e) {
    throw new StoreError();
  }
};
