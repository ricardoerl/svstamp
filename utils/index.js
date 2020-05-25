import uniqBy from 'lodash/uniqBy';

export const getIdFromURL = (url = '') => {
  return url.match(/\/([^/]*)$/)[1];
};

export const validateTweetstampURL = (url = '') => {
  const regexp = /^https:\/\/tweetstamp\.org\/(\d{10,20})/;
  return regexp.test(url);
};

export const getUsersFromTweets = (tweets = []) => {
  const users = tweets.map((tweet) => ({
    label: `@${tweet.user.screen_name}`,
    value: tweet.user.screen_name,
  }));
  return uniqBy(users, 'value');
};
