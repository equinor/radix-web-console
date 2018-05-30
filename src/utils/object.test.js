import { stringsToObject } from './object';

describe('stringsToObject', () => {
  it('creates object using default identity function', () => {
    const strings = ['stringA', 'stringB', 'stringC'];

    expect(stringsToObject(strings)).toEqual({
      stringA: 'stringA',
      stringB: 'stringB',
      stringC: 'stringC',
    });
  });
});
