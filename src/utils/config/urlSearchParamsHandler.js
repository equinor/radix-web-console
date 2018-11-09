import * as configKeys from './keys';

/**
 * This class handles getting config values from url search params.
 * @example
 * radix_cluster for RADIX_CLUSTER_NAME
 * radix_domain for RADIX_DOMAIN_BASE
 * radix_env for RADIX_ENVIRONMENT_NAME
 */
export default class URLSearchParamsHandler {
  searchParams;
  setConfig;

  /**
   * Creates a new instance and keeps provided values.
   *
   * @param {function} setConfig Function to set a config key.
   * @param {URLSearchParams} searchParams Search params from URL context.
   *
   * @example
   * const setConfigFunc = (key, value) => {...};
   * const url = new URL(document.location.href);
   * const urlSearchParamsHandler = new URLSearchParamsHandler(setConfigFunc, url.searchParams);
   */
  constructor(setConfig, searchParams) {
    this.searchParams = searchParams;
    this.setConfig = setConfig;
  }

  /**
   * Load value from search params by name and then set it to the provided
   * config key if there was a value.
   *
   * @param {string} searchParamsName Search param name.
   * @param {string} configKey Config key name.
   */
  loadAndSetKey(searchParamsName, configKey) {
    if (this.searchParams.has(searchParamsName)) {
      this.setConfig(configKey, this.searchParams.get(searchParamsName));
    }
  }

  /**
   * Loads all key values and puts them into config store.
   */
  loadKeys() {
    // silently abort if we don't have searchParams:
    if (
      !this.searchParams ||
      !this.searchParams.get ||
      !this.searchParams.has
    ) {
      return;
    }

    this.loadAndSetKey('radix_cluster', configKeys.keys.RADIX_CLUSTER_NAME);
    this.loadAndSetKey('radix_domain', configKeys.keys.RADIX_DOMAIN_BASE);
    this.loadAndSetKey('radix_env', configKeys.keys.RADIX_ENVIRONMENT_NAME);
  }
}
