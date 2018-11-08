import * as configKeys from './keys';

export default class JsonHandler {
  configJson;
  setConfig;

  constructor(setConfig, configJson) {
    this.configJson = configJson;
    this.setConfig = setConfig;
  }

  loadKeys() {
    this.setConfig(
      configKeys.keys.APP_NAME,
      this.configJson.appName,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_CLUSTER_NAME,
      this.configJson.clusterName,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_DOMAIN_BASE,
      this.configJson.clusterBase,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_ENVIRONMENT_NAME,
      this.configJson.clusterEnvironment,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
  }
}
