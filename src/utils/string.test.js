import { routeWithParams } from './string';

describe('routeWithParams', () => {
  it('should replace the params with correct items', () => {
    var testroute = 'rute/:param/:param2';
    const expectedRoute = 'rute/test/test2';
    testroute = routeWithParams(testroute, { param2: 'test2', param: 'test' });
    expect(testroute).toEqual(expectedRoute);
  });
});
