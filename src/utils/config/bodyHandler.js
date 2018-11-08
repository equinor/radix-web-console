import * as configKeys from './keys';

const env_config_template_start = '${';

export default class BodyHandler {
  bodyAccessor;
  setConfig;

  constructor(setConfig, bodyAccessor) {
    this.bodyAccessor = bodyAccessor;
    this.setConfig = setConfig;
  }

  getKey(key) {
    return this.bodyAccessor(key);
  }

  hasKey(key) {
    const value = this.getKey(key);

    // returns true if we have a value and it does not start with env template.
    return value && !value.startsWith(env_config_template_start);
  }

  loadKey(bodyKey, configKey) {
    if (this.hasKey(bodyKey)) {
      this.setConfig(configKey, this.getKey(bodyKey));
    }
  }

  loadKeys() {
    this.loadKey('data-radix-cluster-name', configKeys.keys.RADIX_CLUSTER_NAME);
    this.loadKey(
      'data-radix-environment-name',
      configKeys.keys.RADIX_ENVIRONMENT_NAME
    );
  }
}
