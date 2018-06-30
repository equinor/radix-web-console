import get from 'lodash/get';

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
export const stringsToObject = (strings, mapper = s => s) =>
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
export const makeLocalGetter = localKey => (obj, key) =>
  get(get(obj, localKey), key);

/**
 * Retrieves a value from an object
 * @callback getterCallback
 * @see [Lodash get]{@link https://lodash.com/docs#get}
 * @param {object} obj
 * @param {string|string[]} key
 */
