import * as configKeys from './keys';

/**
 * This class handles getting config values from url search params.
 * @example
 * radixClusterName for RADIX_CLUSTER_NAME
 * radixClusterBase for RADIX_CLUSTER_BASE
 * radixApiEnvironment for RADIX_API_ENVIRONMENT
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

    this.loadAndSetKey(
      'radixApiEnvironment',
      configKeys.keys.RADIX_API_ENVIRONMENT
    );
    this.loadAndSetKey('radixClusterName', configKeys.keys.RADIX_CLUSTER_NAME);
    this.loadAndSetKey('radixClusterBase', configKeys.keys.RADIX_CLUSTER_BASE);
    this.loadAndSetKey(
      'platformUsersGroup',
      configKeys.keys.PLATFORM_USERS_GROUP
    );
  }
}
