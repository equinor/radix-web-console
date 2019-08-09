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
   * @param {string} paramName Search param name.
   * @param {string} configKey Config key name.
   */
  loadAndSetKey(paramName, configKey) {
    if (this.searchParams.has(paramName)) {
      let parsedParamValue;
      try {
        parsedParamValue = JSON.parse(this.searchParams.get(paramName));
      } catch (e) {
        console.warn(
          `Cannot parse value for URL param "${paramName}" as JSON; ignoring`
        );
        return;
      }
      this.setConfig(configKey, parsedParamValue);
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
    this.loadAndSetKey('radixClusterType', configKeys.keys.RADIX_CLUSTER_TYPE);
    this.loadAndSetKey('radixEnvironment', configKeys.keys.RADIX_ENVIRONMENT);
    this.loadAndSetKey('flags', configKeys.keys.FLAGS);
  }
}
