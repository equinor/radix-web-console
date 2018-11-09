import * as configKeys from './keys';

/**
 * This class handles getting config values from an object.
 */
export default class ObjectHandler {
  configObject;
  setConfig;

  /**
   * Creates a new instance and keeps provided values.
   *
   * @param {function} setConfig Function to set a config key.
   * @param {any} configObject Object with configuration keys and values.
   *
   * @example
   * const setConfigFunc = (key, value) => {...};
   * const dataFromJson = require('config.json');
   * const objectHandler = new ObjectHandler(setConfigFunc, dataFromJson);
   */
  constructor(setConfig, configObject) {
    this.configObject = configObject;
    this.setConfig = setConfig;
  }

  /**
   * Loads all key values and puts them into config store.
   */
  loadKeys() {
    this.setConfig(
      configKeys.keys.APP_NAME,
      this.configObject.appName,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_CLUSTER_NAME,
      this.configObject.clusterName,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_DOMAIN_BASE,
      this.configObject.clusterBase,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
    this.setConfig(
      configKeys.keys.RADIX_ENVIRONMENT_NAME,
      this.configObject.clusterEnvironment,
      configKeys.keySources.RADIX_CONFIG_JSON
    );
  }
}
