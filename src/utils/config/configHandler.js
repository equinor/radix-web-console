import * as configKeys from './keys';

export default class ConfigHandler {
  bodyHandler;
  jsonHandler;

  constructor(bodyHandler, jsonHandler) {
    this.bodyHandler = bodyHandler;
    this.jsonHandler = jsonHandler;
  }

  configStore = {};

  getAppName() {
    return this.getConfig(configKeys.keys.APP_NAME);
  }

  getConfig(key) {
    return this.configStore[key] && this.configStore[key].value;
  }

  getDomain() {
    // TODO: add full override from url OR-190
    return [
      this.getConfig(configKeys.keys.RADIX_CLUSTER_NAME),
      this.getConfig(configKeys.keys.RADIX_ENVIRONMENT_NAME),
      this.getConfig(configKeys.keys.RADIX_DOMAIN_BASE),
    ].join('.');
  }

  setConfig(key, value, source) {
    this.configStore[key] = {
      value,
      source,
    };
  }

  loadKeys() {
    if (this.bodyHandler) {
      this.bodyHandler.loadKeys();
    }

    if (this.jsonHandler) {
      this.jsonHandler.loadKeys();
    }
  }
}
