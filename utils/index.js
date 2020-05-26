import uniqBy from 'lodash/uniqBy';

export const getIdFromURL = (url = '') => {
  const match = url.match(/\/([^/]*)$/);
  const id = match ? match[1] : '';
  return id;
};

export const validateTweetstampURL = (url = '') => {
  const regexp = /^https:\/\/tweetstamp\.org\/(\d{4,20})/;
  return regexp.test(url);
};

export const getUsersFromTweets = (tweets = []) => {
  const users = tweets.map((tweet) => ({
    label: `@${tweet.user.screen_name}`,
    value: tweet.user.screen_name,
  }));
  return uniqBy(users, 'value');
};
