/**
 * This file sets up the configuration with the wanted handlers and ways to
 * access the information needed by those handlers.
 *
 * @example
 * import configHandler from 'utils/config';
 * const domain = configHandler.getDomain();
 */
import ConfigHandler from './configHandler';
import BodyHandler from './bodyHandler';
import ObjectHandler from './objectHandler';
import URLSearchParamsHandler from './urlSearchParamsHandler';
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
const bodyAccessor = (key) => document.body.getAttribute(key);

// create the body handler with func ref for setSonfig and bodyAccessor func
const bodyHandler = new BodyHandler(setConfigFromBody, bodyAccessor);

// setup url search params handler for getting config from current URL
const setConfigFromUrl = (key, value) => {
  configHandler.setConfig(key, value, configKeys.keySources.RADIX_CONFIG_URL);
};

// get URL from current document location
const currentUrl = new URL(document.location.href);
const urlSearchParamsHandler = new URLSearchParamsHandler(
  setConfigFromUrl,
  currentUrl.searchParams
);

/**
 * create the main handler and attach it to configHandler var, handlers are
 * added in the wanted order
 */
configHandler = new ConfigHandler([
  objectHandler,
  bodyHandler,
  urlSearchParamsHandler,
]);

// call the loadKeys that will load all keys from the provided handlers in order
configHandler.loadKeys();

// export the config handler so it can be used by other parts of the solution
export default configHandler;
