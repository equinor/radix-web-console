import type { Secret } from '../../store/radix-api'
import type { CLIENT_CREDENTIALS_SECRET_TYPE, KEY_VAULT_ITEM_SECRET_TYPE } from './keyVault.const'

export type KeyVaultAuthMethod = 'workload-identity' | 'client-credentials'

/** A Key Vault item (key, secret or certificate) read from the vault. */
export type KeyVaultItemSecret = Secret & { readonly type: typeof KEY_VAULT_ITEM_SECRET_TYPE }

/** A clientId/clientSecret credential used to authenticate against the vault. */
export type KeyVaultCredentialSecret = Secret & { readonly type: typeof CLIENT_CREDENTIALS_SECRET_TYPE }

/** All secrets that belong to a single Key Vault: its items and, optionally, its credentials. */
export type KeyVaultSecrets = ReadonlyArray<Secret>
