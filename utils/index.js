export const getIdFromURL = (url = '') => {
  return url.match(/\/([^/]*)$/)[1];
};

export const validateTweetstampURL = (url = '') => {
  const regexp = /^https:\/\/tweetstamp\.org\/(\d{19})/;
  return regexp.test(url);
};
