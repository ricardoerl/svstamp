import fetch from 'isomorphic-unfetch';

export const request = (url, options, callback) => {
  return fetch(url, options)
    .then((response) => response.json())
    .then(callback);
};
