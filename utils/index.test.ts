import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { getIdFromURL, validateTweetstampURL, getDateFormat } from './index';

describe('Get ID from a given URL', () => {
  test('should return an id as string', () => {
    const goodURL = 'https://tweetstamp.org/250810362302185472';
    expect(getIdFromURL(goodURL)).toBe('250810362302185472');
  });
  test('should return an empty string', () => {
    const badURL = 'tweetstamp.org';
    expect(getIdFromURL(badURL)).toBe('');
  });
});

describe('Validate Tweetstamp URL', () => {
  test('should return true for a tweetstamp URL', () => {
    const goodURL = 'https://tweetstamp.org/250810362302185472';
    expect(validateTweetstampURL(goodURL)).toBe(true);
  });
  test('should return false for a non-tweetstamp URL', () => {
    const badURL = 'https://www.google.com';
    expect(validateTweetstampURL(badURL)).toBe(false);
  });
  test('should return false for a malformed URL', () => {
    const badURL = 'google.com';
    expect(validateTweetstampURL(badURL)).toBe(false);
  });
  test('should return false for an empty value', () => {
    expect(validateTweetstampURL()).toBe(false);
  });
});

describe('Get local date format', () => {
  test('should return the current date with correct format', () => {
    const format = 'MMMM D, YYYY – h:mm A';
    expect(getDateFormat()).toBe(dayjs(Date()).locale('es').format(format));
  });
  test('should return the given date with custom format', () => {
    const date = 'Tue May 19 08:21:47 +0000 2020';
    const format = 'MMMM D, YYYY';
    expect(getDateFormat(date, format)).toBe('Mayo 19, 2020');
  });
});
