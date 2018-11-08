import * as config from './index';

export default class JsonHandler {
  loadKeys(configJson) {
    config.setConfig(
      config.keys.APP_NAME,
      configJson.appName,
      config.keySources.RADIX_CONFIG_JSON
    );
    config.setConfig(
      config.keys.RADIX_CLUSTER_NAME,
      configJson.clusterName,
      config.keySources.RADIX_CONFIG_JSON
    );
    config.setConfig(
      config.keys.RADIX_DOMAIN_BASE,
      configJson.clusterBase,
      config.keySources.RADIX_CONFIG_JSON
    );
    config.setConfig(
      config.keys.RADIX_ENVIRONMENT_NAME,
      configJson.clusterEnvironment,
      config.keySources.RADIX_CONFIG_JSON
    );
  }
}
