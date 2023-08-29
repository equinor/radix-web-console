import { ModelNormalizerType, RawModel } from './model-types';

type DateInput = number | string | Date;

// Type filter for objects
type ObjectType<T> = T extends undefined | null
  ? never
  : T extends Record<
      number | string,
      boolean | number | string | undefined | null
    >
  ? never
  : T extends object
  ? T
  : T extends boolean | number | string | unknown
  ? never
  : T;

// Record type filter for objects needing to be normalized
type NormalizerRecord<T> = {
  [K in keyof T as ObjectType<T[K] extends (infer U)[] ? U : T[K]> extends never
    ? never
    : K]: ModelNormalizerType<T[K], T[K] extends Date ? DateInput : T[K]>;
};

/**
 * Normalize an Array with a given normalizer
 *
 * @param array Array
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function arrayNormalizer<T, P>(
  array: Array<P | RawModel<P>>,
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: Array<P> = undefined
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
  date: DateInput,
  defaultValue: Date = undefined
): Date {
  const dateObj = date instanceof Date ? date : new Date(date);
  return !Number.isNaN(dateObj?.valueOf()) ? dateObj : defaultValue;
}

/**
 * Filter keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to keep
 */
export function filterFields<T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K>
): Pick<T, Extract<keyof T, K>> {
  return omitFields<T, K>(
    obj,
    (Object.keys(obj ?? {}) as Array<K>).filter(
      (x) => keys && !keys.includes(x)
    )
  ) as T;
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
  ) as T;
}

/**
 * Omit keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to omit
 */
export function omitFields<T extends object, K extends keyof T>(
  obj: T,
  keys: Array<K>
): Omit<T, K> {
  return obj
    ? Object.keys(obj).reduce<T>(
        (o, key) => (!keys?.includes(key as K) ? { ...o, [key]: obj[key] } : o),
        {} as T
      )
    : obj;
}

/**
 * Normalize an object with a key-mapped normalizer record
 *
 * @param object Object to normalize
 * @param normalizers Normalizer callback record
 */
export function objectNormalizer<T extends object>(
  obj: T | RawModel<T>,
  normalizers: Required<NormalizerRecord<T>>
): T {
  return obj
    ? filterUndefinedFields(
        Object.keys(normalizers ?? {}).reduce(
          (o, key) => ({
            ...o,
            [key]:
              o[key] !== undefined ? normalizers[key]?.(o[key]) : undefined,
          }),
          { ...(obj as T) }
        )
      )
    : undefined;
}

/**
 * Normalize a Record or KeyValuePair object with a given normalizer
 *
 * @param record Record object to iterate over
 * @param normalizer Normalizer callback
 * @param defaultValue default return value
 */
export function recordNormalizer<T, P>(
  record: Record<string | number, P | RawModel<P>>,
  normalizer: ModelNormalizerType<T, P>,
  defaultValue: Record<string | number, P> = undefined
): Record<string | number, ReturnType<ModelNormalizerType<T, P>>> {
  const obj = record ?? defaultValue;
  return obj
    ? filterUndefinedFields(
        Object.keys(obj)
          .filter((key) => !!obj[key])
          .reduce((o, key) => ({ ...o, [key]: normalizer(obj[key]) }), {})
      )
    : undefined;
}
