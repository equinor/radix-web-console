import * as configKeys from './keys';
import URLSearchParamsHandler from './urlSearchParamsHandler';

describe('loadKeys', () => {
  it('should not set values if there are none in url', () => {
    const configStore = {};

    const setConfigFake = (key, value) => {
      configStore[key] = value;
    };

    // create a url to parse
    const url = new URL('https://website.com/route?id=1');

    const handler = new URLSearchParamsHandler(setConfigFake, url.searchParams);
    handler.loadKeys();

    expect(configStore).toMatchObject({}); // empty object
  });

  it('should set values from url', () => {
    const configStore = {};

    const setConfigFake = (key, value) => {
      configStore[key] = value;
    };

    // create a url to parse
    const url = new URL(
      'https://website.com/route?radixApiEnvironment=dev&radixClusterName=release-1&radixClusterBase=cluster.radix.equinor.com'
    );

    const handler = new URLSearchParamsHandler(setConfigFake, url.searchParams);
    handler.loadKeys();

    expect(configStore[configKeys.keys.RADIX_CLUSTER_NAME]).toEqual(
      'release-1'
    );

    expect(configStore[configKeys.keys.RADIX_CLUSTER_BASE]).toEqual(
      'cluster.radix.equinor.com'
    );

    expect(configStore[configKeys.keys.RADIX_API_ENVIRONMENT]).toEqual('dev');
  });

  it('should set only values if they are in url', () => {
    const configStore = {
      [configKeys.keys.RADIX_API_ENVIRONMENT]: 'prod',
    };

    const setConfigFake = (key, value) => {
      configStore[key] = value;
    };

    // create a url to parse
    const url = new URL('https://website.com/route?radixClusterName=release-1');

    const handler = new URLSearchParamsHandler(setConfigFake, url.searchParams);
    handler.loadKeys();

    expect(configStore[configKeys.keys.RADIX_CLUSTER_NAME]).toEqual(
      'release-1'
    );

    expect(configStore[configKeys.keys.RADIX_API_ENVIRONMENT]).toEqual('prod');
  });
});
