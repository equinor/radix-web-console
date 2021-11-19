import * as configKeys from './keys';
import * as jsonConfig from '../../config.json';

export const configVariables = Object.keys(configKeys.keys)
  .map((key) => configKeys.keys[key])
  .reduce((config, key) => {
    config[key] =
      !window[key] || window[key].startsWith('${')
        ? jsonConfig.default[key]
        : window[key];
    return config;
  }, {});
