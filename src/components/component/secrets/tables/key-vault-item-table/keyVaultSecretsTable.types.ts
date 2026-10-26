import type { Secret } from '../../../../../store/radix-api'

/**
 * Known issues a Key Vault can have.
 */
export type KeyVaultIssue =
  | { readonly kind: 'missing-credentials'; readonly inconsistentCredentials: ReadonlyArray<Secret> }
  | { readonly kind: 'no-items-available' }

/** Key vault with its associated secrets */
export interface KeyVault {
  readonly vaultName: string
  readonly secrets: ReadonlyArray<Secret>
}

/** A vault group ready to render, with its issue already derived. */
export interface KeyVaultTableGroup extends KeyVault {
  readonly issue: KeyVaultIssue | undefined
}
