/**
 * This file sets up the configuration with the wanted handlers and ways to
 * access the information needed by those handlers.
 */
import ConfigHandler from './configHandler';
import BodyHandler from './bodyHandler';
import ObjectHandler from './objectHandler';
import * as configKeys from './keys';

let configHandler;

// load config from json
const setConfigFromJson = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_JSON);
};

const objectHandler = new ObjectHandler(
  setConfigFromJson,
  require('../../config.json')
);

// try load the config from document body
const setConfigFromBody = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_BODY);
};

const bodyAccessor = key => document.body.getAttribute(key);

const bodyHandler = new BodyHandler(setConfigFromBody, bodyAccessor);

configHandler = new ConfigHandler([objectHandler, bodyHandler]);
configHandler.loadKeys();
export default configHandler;
