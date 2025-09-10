/**
 * Filter keys of an object
 *
 * @param obj Object to filter
 * @param keys Keys to keep
 */
export function filterFields<T extends object, K extends keyof T>(obj: T, keys: Readonly<Array<K>>): Pick<T, K> {
  return splitFields(obj, keys).filtered
}

/**
 * Split object on keys
 *
 * @param obj Object to filter
 * @param keys Keys to filter
 */
function splitFields<T extends object, K extends keyof T>(
  obj: T,
  keys: Readonly<Array<K>>
): { filtered: Pick<T, K>; unfiltered: Omit<T, K> } {
  return Object.keys(obj ?? {}).reduce(
    (o, key) => {
      // @ts-expect-error I gave up typing this //todo
      o[keys?.includes(key as K) ? 'filtered' : 'unfiltered'][key] = obj?.[key]
      return o
    },
    { filtered: {} as Pick<T, K>, unfiltered: {} as Omit<T, K> }
  )
}
