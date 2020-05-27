import fetch from 'isomorphic-unfetch';

const request = (url, options, callback) => {
  return fetch(url, options)
    .then((response) => response.json())
    .then(callback);
};

export default request;
