import * as configKeys from './keys';
import * as jsonConfig from '../../config.json';

const arrayTransformer = (value, delimiter = ',') =>
  value ? value.split(delimiter) : [];

const transformers = {
  [configKeys.keys.CLUSTER_EGRESS_IPS]: arrayTransformer,
};

export const configVariables = Object.keys(configKeys.keys)
  .map((key) => configKeys.keys[key])
  .reduce((config, key) => {
    const tranformer = transformers[key];
    const value =
      !window[key] || window[key].startsWith('${')
        ? jsonConfig.default[key]
        : window[key];
    config[key] = tranformer ? tranformer(value) : value;
    return config;
  }, {});
