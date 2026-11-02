import type { KeyVaultSecrets } from '../../../../../domain/key-vault/keyVault.types'
import { isKeyVaultCredential, isKeyVaultItem } from '../../../../../domain/key-vault/keyVault.utils'
import type { Secret } from '../../../../../store/radix-api'
import { sortCompareString } from '../../../../../utils/sort-utils'
import { getSecretDisplayName } from '../secretTables.utils'
import type { KeyVault, KeyVaultIssue, KeyVaultTableGroup } from './keyVaultSecretsTable.types'

const isConsistent = (secret: Secret): boolean => secret.status === 'Consistent'

const compareByDisplayName = (a: Secret, b: Secret): number =>
  sortCompareString(getSecretDisplayName(a), getSecretDisplayName(b), 'ascending')

/**
 * Group Key Vault secrets by their vault/resource. Each vault's credentials
 * are listed before its items, since the items depend on the credentials.
 */
const groupSecretsByVault = (secrets: ReadonlyArray<Secret>): Array<KeyVault> => {
  const vaults = new Map<string, { credentials: Array<Secret>; items: Array<Secret> }>()

  for (const secret of secrets) {
    const vaultName = secret.resource ?? ''
    let group = vaults.get(vaultName)
    if (!group) {
      group = { credentials: [], items: [] }
      vaults.set(vaultName, group)
    }

    if (isKeyVaultCredential(secret)) {
      group.credentials.push(secret)
    } else {
      group.items.push(secret)
    }
  }

  return [...vaults.entries()]
    .sort(([a], [b]) => sortCompareString(a, b, 'ascending'))
    .map(([vaultName, { credentials, items }]) => ({
      vaultName,
      secrets: [...credentials.toSorted(compareByDisplayName), ...items.toSorted(compareByDisplayName)],
    }))
}

/** Credentials (clientId/clientSecret) that exist for a vault but aren't `Consistent`. */
const getInconsistentCredentials = (vaultSecrets: KeyVaultSecrets): Array<Secret> =>
  vaultSecrets.filter((secret) => isKeyVaultCredential(secret) && !isConsistent(secret))

/** True when the vault has items and none of them resolved. */
const areAllItemsUnavailable = (vaultSecrets: KeyVaultSecrets): boolean => {
  const items = vaultSecrets.filter(isKeyVaultItem)
  return items.length > 0 && !items.some(isConsistent)
}

/**
 * The single issue to surface for a vault, or `undefined` when it's healthy.
 * Missing credentials win over unavailable items, since the latter is a consequence of the former.
 */
export const getKeyVaultIssue = (vaultSecrets: KeyVaultSecrets): KeyVaultIssue | undefined => {
  const inconsistentCredentials = getInconsistentCredentials(vaultSecrets)

  if (inconsistentCredentials.length > 0) {
    return { kind: 'missing-credentials', inconsistentCredentials }
  }

  if (areAllItemsUnavailable(vaultSecrets)) {
    return { kind: 'no-items-available' }
  }

  return undefined
}

/**
 * Groups Key Vault secrets by vault and checks for potential issues.
 */
export const buildKeyVaultTableGroups = (secrets: ReadonlyArray<Secret>): Array<KeyVaultTableGroup> =>
  groupSecretsByVault(secrets).map(
    (group): KeyVaultTableGroup => ({
      ...group,
      issue: getKeyVaultIssue(group.secrets),
    })
  )
