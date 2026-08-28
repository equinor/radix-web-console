import type { ConfigValue } from './configList.types'

/** Normalizes a config value into a list so single and multi-value fields render the same. */
export const toValueList = (value: ConfigValue): string[] => {
  if (value == null) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}
