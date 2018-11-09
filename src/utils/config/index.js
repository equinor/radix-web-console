import ConfigHandler from './configHandler';
import BodyHandler from './bodyHandler';
import JsonHandler from './jsonHandler';
import * as configKeys from './keys';

let configHandler;

// load config from json
const setConfigFromJson = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_JSON);
};

const jsonHandler = new JsonHandler(
  setConfigFromJson,
  require('../../config.json')
);

// try load the config from document body
const setConfigFromBody = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_BODY);
};

const bodyAccessor = key => {
  return document.body.getAttribute(key);
};

const bodyHandler = new BodyHandler(setConfigFromBody, bodyAccessor);

configHandler = new ConfigHandler([jsonHandler, bodyHandler]);
configHandler.loadKeys();
export default configHandler;
