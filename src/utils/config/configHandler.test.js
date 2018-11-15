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

  it('should not crash if key is not set', () => {
    const configHandler = new ConfigHandler();
    const valueFromConfig = configHandler.getConfig('TEST_KEY');
    expect(valueFromConfig).toBeUndefined();
  });
});

describe('getDomain', () => {
  it('returns correct string based on config', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig(configKeys.keys.RADIX_CLUSTER_NAME, 'cluster-test');
    configHandler.setConfig(
      configKeys.keys.RADIX_CLUSTER_BASE,
      'some.domain.com'
    );

    // This should be ignored by getDomain()
    configHandler.setConfig(configKeys.keys.RADIX_API_ENVIRONMENT, 'env');

    const domain = configHandler.getDomain();
    expect(domain).toEqual('cluster-test.some.domain.com');
  });
});

describe('getDomainConfigValuesViaUrl', () => {
  it('returns values if source is URL', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig(
      configKeys.keys.RADIX_CLUSTER_NAME,
      'cluster-test',
      configKeys.keySources.RADIX_CONFIG_URL
    );

    const values = configHandler.getDomainConfigValuesViaUrl();
    expect(values[0].key).toEqual(configKeys.keys.RADIX_CLUSTER_NAME);
    expect(values[0].value).toEqual('cluster-test');
  });
});

describe('hasDomainConfigViaUrl', () => {
  describe('should return true if we have any config from URL source', () => {
    const keysToTest = [
      configKeys.keys.RADIX_CLUSTER_NAME,
      configKeys.keys.RADIX_CLUSTER_BASE,
      configKeys.keys.RADIX_API_ENVIRONMENT,
    ];

    keysToTest.forEach(key => {
      it(key, () => {
        const configHandler = new ConfigHandler();
        configHandler.setConfig(
          key,
          'test_value',
          configKeys.keySources.RADIX_CONFIG_URL
        );
        expect(configHandler.hasDomainConfigViaUrl()).toBeTruthy();
      });
    });
  });

  it('should return false if we have nothing from URL source', () => {
    const configHandler = new ConfigHandler();
    configHandler.setConfig(
      'TEST_KEY',
      'test_value',
      configKeys.keySources.RADIX_CONFIG_BODY
    );
    configHandler.setConfig(
      'TEST_KEY2',
      'test_value2',
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    expect(configHandler.hasDomainConfigViaUrl()).toBeFalsy();
  });
});

describe('loadKeys', () => {
  it('should call handlers in provided order', () => {
    const callOrder = [];

    const fakeJsonHandler = {
      loadKeys: () => {
        callOrder.push('json');
      },
    };

    const fakeBodyHandler = {
      loadKeys: () => {
        callOrder.push('body');
      },
    };

    const configHandler = new ConfigHandler([fakeJsonHandler, fakeBodyHandler]);
    configHandler.loadKeys();

    expect(callOrder[0]).toEqual('json');
    expect(callOrder[1]).toEqual('body');
  });

  it('should not crash if handlers are not set', () => {
    const configHandler = new ConfigHandler();
    expect(() => configHandler.loadKeys()).not.toThrow();
  });
});
