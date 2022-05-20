import { ModelNormalizerType } from './model-types';

/**
 * Normalize an Array with a given normalizer
 *
 * @param array Array
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function arrayNormalizer<T, P>(
  array: Array<unknown>,
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: Array<T> = undefined
): Array<Readonly<T>> {
  return Array.isArray(array)
    ? array.map(normalizer)
    : defaultValue?.map((x) => Object.freeze(x));
}

/**
 * Normalize a Date object
 *
 * @param date Date object
 * @param defaultValue default return value
 */
export function dateNormalizer(
  date: number | string | Date,
  defaultValue: Date = undefined
): Readonly<Date> {
  const dateObj = date instanceof Date ? date : new Date(date);
  return Object.freeze(!isNaN(dateObj?.valueOf()) ? dateObj : defaultValue);
}

/**
 * Normalize a KeyValuePair object with a given normalizer
 *
 * @param kvpObject KeyValuePair object to iterate over
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function keyValuePairNormalizer<T, P = unknown>(
  kvpObject: { [key: string | number]: P },
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: { [key: string | number]: T } = {}
): Readonly<{ [key: string | number]: T }> {
  return Object.freeze(
    Object.keys(kvpObject).reduce<{ [key: string]: T }>((obj, key) => {
      obj[key] = normalizer(kvpObject[key]);
      return obj;
    }, defaultValue)
  );
}
