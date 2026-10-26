import type { Secret } from '../../store/radix-api'
import { CLIENT_CREDENTIALS_SECRET_TYPE, KEY_VAULT_ITEM_SECRET_TYPE } from './keyVault.const'
import type { KeyVaultAuthMethod, KeyVaultSecrets } from './keyVault.types'

/** A Key Vault item (key, secret or certificate) read from the vault. */
export function isKeyVaultItem(secret: Secret): boolean {
  return secret.type === KEY_VAULT_ITEM_SECRET_TYPE
}

/** A clientId/clientSecret credential used to authenticate against the vault. */
export function isKeyVaultCredential(secret: Secret): boolean {
  return secret.type === CLIENT_CREDENTIALS_SECRET_TYPE
}

/**
 * A vault authenticates with a clientId/clientSecret pair when it has credential
 * secrets; without them it relies on the component's workload identity.
 */
export function usesClientCredentials(vaultSecrets: KeyVaultSecrets): boolean {
  return vaultSecrets.some(isKeyVaultCredential)
}

export function getKeyVaultAuthMethod(vaultSecrets: KeyVaultSecrets): KeyVaultAuthMethod {
  return usesClientCredentials(vaultSecrets) ? 'client-credentials' : 'workload-identity'
}
