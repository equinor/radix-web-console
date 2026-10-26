import type { Secret } from '../../store/radix-api'

export type KeyVaultAuthMethod = 'workload-identity' | 'client-credentials'

/** All secrets that belong to a single Key Vault: its items and, optionally, its credentials. */
export type KeyVaultSecrets = ReadonlyArray<Secret>
