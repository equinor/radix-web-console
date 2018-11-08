import ConfigHandler from './configHandler';
import * as configKeys from './keys';

describe('getAppName', () => {
  it('returns set app name', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig(configKeys.keys.APP_NAME, 'My Test Name');

    const appName = configHandler.getAppName();
    expect(appName).toEqual('My Test Name');
  });
});

describe('getConfig', () => {
  it('should return correct value for a set key', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig('TEST_KEY', 'test value');

    const valueFromConfig = configHandler.getConfig('TEST_KEY');
    expect(valueFromConfig).toEqual('test value');
  });
});

describe('getDomain', () => {
  it('returns correct string based on config', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig(configKeys.keys.RADIX_CLUSTER_NAME, 'cluster-test');
    configHandler.setConfig(
      configKeys.keys.RADIX_DOMAIN_BASE,
      'some.domain.com'
    );
    configHandler.setConfig(configKeys.keys.RADIX_ENVIRONMENT_NAME, 'env');

    const domain = configHandler.getDomain();
    expect(domain).toEqual('cluster-test.env.some.domain.com');
  });
});

describe('loadKeys', () => {
  it('should call bodyHandler first', () => {
    const callOrder = [];

    const fakeBodyHandler = {
      loadKeys: () => {
        callOrder.push('body');
      },
    };

    const fakeJsonHandler = {
      loadKeys: () => {
        callOrder.push('json');
      },
    };

    const configHandler = new ConfigHandler(fakeBodyHandler, fakeJsonHandler);
    configHandler.loadKeys();

    expect(callOrder[0]).toEqual('body');
  });
});
