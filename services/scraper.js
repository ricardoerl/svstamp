import fetch from 'isomorphic-unfetch';
import cheerio from 'cheerio';

const scraper = async (url = '') => {
  const scrapping = await fetch(url);
  const html = await scrapping.text();

  // Load cheerio object
  const $ = cheerio.load(html);

  // Query stamp data
  const rawobject = $('.ots-details').children().first().text(); // Tweet object
  const object = JSON.parse(rawobject);
  const name = $('.card-title').text();
  const avatar = $('.card-body img').attr('src').replace('http', 'https');

  // Create stamp object
  const stamp = {
    ...object,
    user: {
      ...object.user,
      name,
      avatar,
    },
  };

  return stamp;
};

export default scraper;
