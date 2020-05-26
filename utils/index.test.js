import { getIdFromURL } from './index';

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
