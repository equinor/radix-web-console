import { stringsToObject, paramStringToObject } from './object';

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

describe('paramStringToObject', () => {
  it('works using defaults', () => {
    const input = 'a=1&b=2&c=3&fruit=banana';

    expect(paramStringToObject(input)).toEqual({
      a: '1',
      b: '2',
      c: '3',
      fruit: 'banana',
    });
  });

  it('works using custom item delimiter', () => {
    const input = 'anItem=aValue|anotherItem=anotherValue';

    expect(paramStringToObject(input, '|')).toEqual({
      anItem: 'aValue',
      anotherItem: 'anotherValue',
    });
  });

  it('works using custom key-value delimiter', () => {
    const input = 'anItem:aValue/anotherItem:anotherValue';

    expect(paramStringToObject(input, '/', ':')).toEqual({
      anItem: 'aValue',
      anotherItem: 'anotherValue',
    });
  });

  it('handles a single item', () => {
    const input = 'one=two';

    expect(paramStringToObject(input)).toEqual({ one: 'two' });
  });

  it('handles empty string', () => {
    expect(paramStringToObject('')).toEqual({});
  });
});
