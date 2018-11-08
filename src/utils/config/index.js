import BodyHandler from './bodyHandler';
import JsonHandler from './jsonHandler';

let configStore = {};

export const keySources = Object.freeze({
  RADIX_CONFIG_JSON: 'RADIX_CONFIG_JSON',
  RADIX_CONFIG_BODY: 'RADIX_CONFIG_BODY',
});

export const keys = Object.freeze({
  APP_NAME: 'APP_NAME',
  RADIX_CLUSTER_NAME: 'RADIX_CLUSTER_NAME',
  RADIX_DOMAIN_BASE: 'RADIX_DOMAIN_BASE',
  RADIX_ENVIRONMENT_NAME: 'RADIX_ENVIRONMENT_NAME',
});

export const getConfig = key => configStore[key] && configStore[key].value;

export const getAppName = () => getConfig(keys.APP_NAME);

export const getDomain = () => {
  // TODO: add full override from url OR-190
  return [
    getConfig(keys.RADIX_CLUSTER_NAME),
    getConfig(keys.RADIX_ENVIRONMENT_NAME),
    getConfig(keys.RADIX_DOMAIN_BASE),
  ].join('.');
};

export const setConfig = (key, value, source) => {
  configStore[key] = {
    value,
    source,
  };
};

// load config from json
const jsonHandler = new JsonHandler();
jsonHandler.loadKeys(require('../../config.json'));

// try load the config from document body
const bodyHandler = new BodyHandler();
bodyHandler.loadKeys();
