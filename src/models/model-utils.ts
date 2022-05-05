import { ModelNormalizerType } from './model-types';

/**
 * Normalize a Date object
 *
 * @param date Date object
 */
export function DateNormalizer(date: number | string | Date): Readonly<Date> {
  const dateObj = date instanceof Date ? date : new Date(date);
  return Object.freeze(!isNaN(dateObj?.valueOf()) ? dateObj : undefined);
}

/**
 * Normalize a KeyValuePair object with a given normalizer
 *
 * @param kvpObject KeyValuePair object to iterate over
 * @param normalizer Normalizer callback
 */
export function KeyValuePairNormalizer<T, P = unknown>(
  kvpObject: { [key: string | number]: P },
  normalizer: ModelNormalizerType<T, P>
): Readonly<{ [key: string | number]: T }> {
  return Object.freeze(
    Object.keys(kvpObject).reduce<{
      [key: string]: T;
    }>((obj, key) => {
      obj[key] = normalizer(kvpObject[key]);
      return obj;
    }, {})
  );
}
