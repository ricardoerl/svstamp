export const getIdFromURL = (url = '') => {
  return url.match(/\/([^/]*)$/)[1];
};
