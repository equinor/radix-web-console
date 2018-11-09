/**
 * This file sets up the configuration with the wanted handlers and ways to
 * access the information needed by those handlers.
 */
import ConfigHandler from './configHandler';
import BodyHandler from './bodyHandler';
import ObjectHandler from './objectHandler';
import * as configKeys from './keys';

// store the ref for variable for handlers below
let configHandler;

// load config from json
const setConfigFromJson = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_JSON);
};

// setup the object handler with func ref and data
const objectHandler = new ObjectHandler(
  setConfigFromJson,
  require('../../config.json')
);

// try load the config from document body
const setConfigFromBody = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_BODY);
};

// setup document.body accessor for body handler
const bodyAccessor = key => document.body.getAttribute(key);

// create the body handler with func ref for setSonfig and bodyAccessor func
const bodyHandler = new BodyHandler(setConfigFromBody, bodyAccessor);

/**
 * create the main handler and attach it to configHandler var, handlers are
 * added in the wanted order
 */
configHandler = new ConfigHandler([objectHandler, bodyHandler]);

// call the loadKeys that will load all keys from the provided handlers in order
configHandler.loadKeys();

// export the config handler so it can be used by other parts of the solution
export default configHandler;
