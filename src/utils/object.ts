import { get } from 'lodash-es'

type NestedKeyOf<T extends object> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]> extends infer U extends string ? U : never}`
    : `${K}`
}[keyof T & (string | number)]

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
export function stringsToObject<T extends string = string>(
  strings: Array<string>,
  mapper: (str: string) => string = (s) => s
): Record<T, string> {
  return strings.reduce<Record<string, string>>((obj, str) => ({ ...obj, [str]: mapper(str) }), {})
}

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
export function makeLocalGetter<O extends object>(
  localPath: NestedKeyOf<O> | Array<string>
): <T>(obj: O, path: string | Array<string>, defaultValue?: T) => T {
  return function (obj, path, defaultValue) {
    return get(get(obj, localPath), path, defaultValue)
  }
}

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
export function paramStringToObject<T extends string = string>(
  str: string,
  itemSep = '&',
  keyValSep = '='
): Record<T, string> {
  return str.split(itemSep).reduce<Record<string, string>>((obj, keyVal) => {
    const keyValArr = keyVal.split(keyValSep)
    return { ...obj, [keyValArr[0]]: keyValArr[1] }
  }, {})
}
