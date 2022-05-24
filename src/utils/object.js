import { get } from 'lodash';

/**
 * Transforms an array of strings onto an object where the strings are keys and
 * the values are obtained by passing the strings to a mapper function
 *
 * @param {string[]} strings Array of strings to be transformed
 * @param {mapperCallback} [mapper] Function that transforms each string; it
 *   defaults to the identity function
 *
 * @example
 *   stringsToObject(['a', 'b'], Symbol);
 *   // => { a: Symbol('a'), b: Symbol('b') }
 */
export const stringsToObject = (strings, mapper = (s) => s) =>
  strings.reduce((obj, str) => {
    obj[str] = mapper(str);
    return obj;
  }, {});

/**
 * Maps a string to a value
 * @callback mapperCallback
 * @param {string} str The string to transform
 * @return {} The result of the transformation
 */

// -----------------------------------------------------------------------------

/**
 * Creates a function to retrieve the value of an object key, nested within a
 * larger object structure.
 *
 * @param {string|string[]} localKey Path to a 'local' sub-object. The syntax is
 *   the same as for [Lodash get]{@link https://lodash.com/docs#get}
 * @returns {getterCallback}
 *
 * @example
 *   const state = { user: { address: { postcode: 'ABC' } } };
 *   const getAddressPart = makeLocalGetter('user.address');
 *   const postcode = getAddressPart('postcode', state);
 *   // => 'ABC'
 */
export const makeLocalGetter = (localKey) => (obj, key, defaultValue) =>
  get(get(obj, localKey), key, defaultValue);

/**
 * Retrieves a value from an object
 * @callback getterCallback
 * @see [Lodash get]{@link https://lodash.com/docs#get}
 * @param {object} obj
 * @param {string|string[]} key
 */

// -----------------------------------------------------------------------------

/**
 * Creates an object map from a string
 *
 * @param {string} str The string of parameters
 * @param {string} itemSep Parameter separator
 * @param {string} keyValSep Key/value separator
 *
 * @example
 *   const obj = paramStringToObject('one=1&two=2');
 *   // => { one: '1', two: '2' }
 */
export const paramStringToObject = (str, itemSep = '&', keyValSep = '=') => {
  const obj = {};

  str.split(itemSep).forEach((keyVal) => {
    const keyValArr = keyVal.split(keyValSep);
    obj[keyValArr[0]] = keyValArr[1];
  });

  return obj;
};

/**
 * Checks if an object is null or undefined
 *
 * @param {unknown} obj
 * @returns {boolean} true if the object is null or undefined
 */
export function isNullOrUndefined(obj) {
  return obj === undefined || obj === null;
}
