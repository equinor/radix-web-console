import type { Secret } from '../../../store/radix-api'
import { GenericSecretsTable } from './tables/GenericSecretsTable'
import type { SecretTableDefinition, SecretTableSection } from './tables/secretTables.types'

/**
 * Assign each secret to the table whose definition lists its type. Secrets of unknown
 * types are collected into an "Uncategorized" section rendered with the generic table.
 */
export function buildSecretTableSections(
  secrets: Array<Secret>,
  definitions: ReadonlyArray<SecretTableDefinition>
): Array<SecretTableSection> {
  const knownTypes = new Set(definitions.flatMap(({ types }) => types))

  const sections = definitions
    .map<SecretTableSection>(({ types, ...rest }) => ({
      secrets: secrets.filter(({ type }) => types.includes(type)),
      ...rest,
    }))
    .filter(({ secrets }) => secrets.length > 0)

  const uncategorized = secrets.filter(({ type }) => !knownTypes.has(type))
  if (uncategorized.length > 0) {
    sections.push({
      title: 'Uncategorized',
      Component: GenericSecretsTable,
      secrets: uncategorized,
    })
  }

  return sections
}
