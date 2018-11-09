import * as configKeys from './keys';

/**
 * This class handles configuration. It has support for multiple handlers, which
 * can when called, set configuration key values.
 */
export default class ConfigHandler {
  handlers;

  /**
   * Creates a new instance and keeps handlers if provided.
   *
   * @example
   * const configHandler = new ConfigHandler([myHandlerA, myHandlerB]);
   *
   * @param {any[]} handlers List of handlers to use.
   */
  constructor(handlers = []) {
    this.handlers = handlers;
  }

  configStore = {};

  /**
   * Gets the application name from store.
   */
  getAppName() {
    return this.getConfig(configKeys.keys.APP_NAME);
  }

  /**
   * Gets provided key from config store, will safely return undefined if no
   * value has been set for key.
   *
   * @param {string} key Key name.
   */
  getConfig(key) {
    return this.configStore[key] && this.configStore[key].value;
  }

  /**
   * Get domain from config store, this will compose different keys together to
   * create the domain url.
   *
   * The following keys are used: RADIX_CLUSTER_NAME, RADIX_ENVIRONMENT_NAME
   * and RADIX_DOMAIN_BASE.
   *
   * @example
   *   RADIX_CLUSTER_NAME = "cluster"
   *   RADIX_ENVIRONMENT_NAME = "env"
   *   RADIX_DOMAIN_BASE = "radix.equinor.com"
   *   Returns: "cluster.env.radix.equinor.com"
   */
  getDomain() {
    return [
      this.getConfig(configKeys.keys.RADIX_CLUSTER_NAME),
      this.getConfig(configKeys.keys.RADIX_ENVIRONMENT_NAME),
      this.getConfig(configKeys.keys.RADIX_DOMAIN_BASE),
    ].join('.');
  }

  /**
   * Sets new value for key in config store with reference to what source set
   * it's value.
   *
   * @param {string} key Key name.
   * @param {any} value Value for the key.
   * @param {string} source What was the source of this assignment.
   */
  setConfig(key, value, source) {
    this.configStore[key] = {
      value,
      source,
    };
  }

  /**
   * This will loop through all handlers (if any) in order and calls loadKeys()
   * on the handler. If the handlers does not have loadKeys, if will silently
   * continue to the next handler in line.
   */
  loadKeys() {
    // exit if handlers have no value or has no values
    if (!this.handlers || !this.handlers.length) {
      return;
    }

    for (const idx in this.handlers) {
      if (this.handlers[idx].loadKeys) {
        this.handlers[idx].loadKeys();
      }
    }
  }
}
