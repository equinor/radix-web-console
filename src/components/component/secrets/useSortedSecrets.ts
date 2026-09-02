import { useMemo } from 'react'
import type { Secret } from '../../../store/radix-api'
import { dataSorter, type SortDirection, sortCompareString } from '../../../utils/sort-utils'
import { getSecretDisplayName } from './tables/secretTables.utils'

export function useSortedSecrets(
  secrets: Array<Secret>,
  nameSort?: SortDirection,
  resourceSort?: SortDirection
): Array<Secret> {
  return useMemo(
    () =>
      dataSorter(secrets, [
        (a, b) => sortCompareString(getSecretDisplayName(a), getSecretDisplayName(b), nameSort, true, () => !!nameSort),
        (a, b) => sortCompareString(a.resource, b.resource, resourceSort, true, () => !!resourceSort),
      ]),
    [nameSort, resourceSort, secrets]
  )
}
