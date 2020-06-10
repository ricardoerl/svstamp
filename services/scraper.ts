import fetch from 'isomorphic-unfetch';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cheerio from 'cheerio';

dayjs.extend(utc);

const scraper = async (url = '') => {
  const scrapping = await fetch(url);
  const html = await scrapping.text();

  // Load cheerio object
  const $ = cheerio.load(html);

  // Query stamp data
  const rawobject = $('.ots-details').children().first().text(); // Tweet object
  const object = JSON.parse(rawobject);
  const name = $('.card-title').text();
  const avatar = $('.card-body img').attr('src');
  if (avatar) {
    avatar.replace('http', 'https');
  }

  // Create stamp object
  const stamp = {
    ...object,
    created_at: dayjs(object.created_at).utc().format(),
    saved_at: dayjs().utc().format(),
    user: {
      ...object.user,
      name,
      avatar,
    },
  };

  return stamp;
};

export default scraper;
