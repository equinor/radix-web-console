import { ModelNormalizerType } from './model-types';

/**
 * Normalize an Array with a given normalizer
 *
 * @param array Array
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function arrayNormalizer<T, P>(
  array: Array<P>,
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: Array<P | T> = undefined
): Array<ReturnType<ModelNormalizerType<T, P>>> {
  return (Array.isArray(array) ? array : defaultValue)?.map(normalizer);
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
  return Object.freeze(
    !Number.isNaN(dateObj?.valueOf()) ? dateObj : defaultValue
  );
}

/**
 * Filter keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to keep
 */
export function filterFields<
  T extends object,
  K extends keyof U,
  U extends object = T
>(obj: T, keys: Array<K>): T {
  return omitFields<T, K, U>(
    obj,
    (Object.keys(obj ?? {}) as Array<K>).filter(
      (x) => keys && !keys.includes(x)
    )
  );
}

/**
 * Filter fields with a value of undefined
 *
 * @param obj Object to filter
 */
export function filterUndefinedFields<T extends object>(obj: T): T {
  return omitFields(
    obj,
    (Object.keys(obj ?? {}) as Array<keyof T>).filter(
      (x) => obj[x] === undefined
    )
  );
}

/**
 * Omit keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to omit
 */
export function omitFields<
  T extends object,
  K extends keyof U,
  U extends object = T
>(obj: T, keys: Array<K>): T {
  return !!obj
    ? Object.keys(obj).reduce<T>(
        (o, key) => (!keys?.includes(key as K) ? { ...o, [key]: obj[key] } : o),
        {} as T
      )
    : obj;
}

/**
 * Normalize a Record or KeyValuePair object with a given normalizer
 *
 * @param record Record object to iterate over
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function recordNormalizer<T, P = unknown>(
  record: Record<string | number, P>,
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: Record<string | number, T> = {}
): Readonly<Record<string | number, ReturnType<ModelNormalizerType<T, P>>>> {
  return !!record || Object.keys(defaultValue).length > 0
    ? Object.freeze(
        filterUndefinedFields(
          Object.keys(record ?? {})
            .filter((key) => !!record[key])
            .reduce(
              (obj, key) => ({ ...obj, [key]: normalizer(record[key]) }),
              defaultValue
            )
        )
      )
    : undefined;
}
