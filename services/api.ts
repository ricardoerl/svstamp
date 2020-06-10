import fetch from 'isomorphic-unfetch';

type Options = {
  method?: string;
  body?: string;
};

type Callback = (args: any) => void;

const request = (url: string, options: Options, callback: Callback) => {
  return fetch(url, options)
    .then((response) => response.json())
    .then(callback);
};

export default request;
