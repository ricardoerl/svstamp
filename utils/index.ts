import uniqBy from 'lodash/uniqBy';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';

import { TweetData, User } from '../types/';

dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const getIdFromURL = (url = '') => {
  const match = url.match(/\/([^/]*)$/);
  const id = match ? match[1] : '';
  return id;
};

export const validateTweetstampURL = (url = '') => {
  const regexp = /^https:\/\/tweetstamp\.org\/(\d{4,20})/;
  return regexp.test(url);
};

export const getUsersFromTweets = (tweets: TweetData[] = []) => {
  const users: User[] = tweets.map((tweet) => ({
    label: `@${tweet.user.screen_name}`,
    value: tweet.user.screen_name,
  }));
  return uniqBy(users, 'value');
};

export const getDateFormat = (date = Date(), format = 'MMMM D, YYYY – h:mm A') => {
  return dayjs(date).locale('es').format(format);
};
