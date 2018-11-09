import * as configKeys from './keys';

export default class ConfigHandler {
  handlers;

  constructor(handlers = []) {
    this.handlers = handlers;
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
