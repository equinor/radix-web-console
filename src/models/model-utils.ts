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
 * Filter keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to keep
 */
export function filterFields<T extends object, K extends keyof T>(
  obj: T,
  keys: Readonly<Array<K>>
): Pick<T, K> {
  return splitFields(obj, keys).filtered;
}

/**
 * Filter fields with a value of undefined
 *
 * @param obj Object to filter
 */
export function filterUndefinedFields<T extends object>(obj: T): T {
  return splitFields(
    obj,
    (Object.keys(obj ?? {}) as Array<keyof T>).filter(
      (x) => obj[x] !== undefined
    )
  ).filtered;
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
 * Split object on keys
 *
 * @param obj Object to filter
 * @param keys Keys to filter
 */
export function splitFields<T extends object, K extends keyof T>(
  obj: T,
  keys: Readonly<Array<K>>
): { filtered: Pick<T, K>; unfiltered: Omit<T, K> } {
  return Object.keys(obj ?? {}).reduce(
    (o, key) => {
      o[keys?.includes(key as K) ? 'filtered' : 'unfiltered'][key] = obj?.[key];
      return o;
    },
    { filtered: {} as Pick<T, K>, unfiltered: {} as Omit<T, K> }
  );
}
