import type { Secret } from '../../../store/radix-api'
import { GenericSecretsTable } from './tables/GenericSecretsTable'
import type { SecretTableGroup, SecretTableItem } from './tables/secretTables.types'

/**
 * Group secrets into their respective categories based on the provided type.
 */
export function groupSecrets(secrets: Array<Secret>, groups: ReadonlyArray<SecretTableGroup>): Array<SecretTableItem> {
  const groupTypes = new Set(groups.flatMap(({ types }) => types))

  const grouped = groups
    .map<SecretTableItem>(({ types, ...rest }) => ({
      secrets: secrets.filter(({ type }) => types.includes(type)),
      ...rest,
    }))
    .filter(({ secrets }) => secrets.length > 0)

  // secrets that don't match any known group go into an uncategorized list
  const uncategorized = secrets.filter(({ type }) => !groupTypes.has(type))
  if (uncategorized.length > 0) {
    grouped.push({
      title: 'Uncategorized',
      Component: GenericSecretsTable,
      secrets: uncategorized,
    })
  }

  return grouped
}
