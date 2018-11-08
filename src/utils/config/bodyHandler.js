import * as config from './index';

const env_config_template_start = '${';

export default class BodyHandler {
  getKey(key) {
    return document.body.getAttribute(key);
  }

  hasKey(key) {
    const value = this.getKey(key);

    // returns true if we have a value and it does not start with env template.
    return value && !value.startsWith(env_config_template_start);
  }

  loadKey(bodyKey, configKey) {
    if (this.hasKey(bodyKey)) {
      config.setConfig(
        configKey,
        this.getKey(bodyKey),
        config.keySources.RADIX_CONFIG_BODY
      );
    }
  }

  loadKeys() {
    this.loadKey('data-radix-cluster-name', config.keys.RADIX_CLUSTER_NAME);
    this.loadKey(
      'data-radix-environment-name',
      config.keys.RADIX_ENVIRONMENT_NAME
    );
  }
}
