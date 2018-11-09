import * as configKeys from './keys';

const env_config_template_start = '${';

/**
 * This class handles getting config values from body. Itself does not directly
 * access the document.body, but is passed required references in constructor.
 */
export default class BodyHandler {
  bodyAccessor;
  setConfig;

  /**
   * Creates a new instance and keeps provided values.
   *
   * @param {function} setConfig Function to set a config key.
   * @param {function} bodyAccessor Function to set a config key.
   *
   * @example
   * const setConfigFunc = (key, value) => {...};
   * const bodyAccessorFunc = key => document.body.getAttribute(key);
   * const bodyHandler = new BodyHandler(setConfigFunc, bodyAccessorFunc);
   */
  constructor(setConfig, bodyAccessor) {
    this.bodyAccessor = bodyAccessor;
    this.setConfig = setConfig;
  }

  /**
   * Gets the key value via bodyAccessor function reference.
   * @param {string} key Key name.
   */
  getKey(key) {
    return this.bodyAccessor(key);
  }

  /**
   * Validates that key has value via bodyAccessor function reference.
   * @param {string} key Key name.
   * @returns {boolean} Key has value.
   */
  hasKey(key) {
    const value = this.getKey(key);

    // returns true if we have a value and it does not start with env template.
    return value && !value.startsWith(env_config_template_start);
  }

  /**
   * Gets the key value via bodyAccessor function reference and then sets config
   * value for this key.
   * @param {string} bodyKey Key name for bodyAccessor.
   * @param {string} configKey Key name for config store.
   */
  loadKeyAndSetConfig(bodyKey, configKey) {
    if (this.hasKey(bodyKey)) {
      this.setConfig(configKey, this.getKey(bodyKey));
    }
  }

  /**
   * Loads all key values and puts them into config store.
   */
  loadKeys() {
    this.loadKeyAndSetConfig(
      'data-radix-cluster-name',
      configKeys.keys.RADIX_CLUSTER_NAME
    );
    this.loadKeyAndSetConfig(
      'data-radix-environment-name',
      configKeys.keys.RADIX_ENVIRONMENT_NAME
    );
  }
}
