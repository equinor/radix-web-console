import { CLIENT_CREDENTIALS_SECRET_TYPE, KEY_VAULT_ITEM_SECRET_TYPE } from '../../../domain/key-vault/keyVault.const'
import { GenericSecretsTable } from './tables/GenericSecretsTable'
import { KeyVaultSecretsTable } from './tables/key-vault-item-table/KeyVaultSecretsTable'
import type { SecretTableDefinition } from './tables/secretTables.types'
import { VolumeMountSecretsTable } from './tables/VolumeMountSecretsTable'

export const SECRET_TABLE_DEFINITIONS: ReadonlyArray<SecretTableDefinition> = Object.freeze([
  {
    title: 'Secrets',
    Component: GenericSecretsTable,
    types: ['generic'],
  },
  {
    title: 'Volume Mounts',
    Component: VolumeMountSecretsTable,
    types: ['csi-azure-blob-volume'],
  },
  {
    title: 'Key Vault Items',
    Component: KeyVaultSecretsTable,
    types: [KEY_VAULT_ITEM_SECRET_TYPE, CLIENT_CREDENTIALS_SECRET_TYPE],
  },
  {
    title: 'OAuth2',
    Component: GenericSecretsTable,
    types: ['oauth2-proxy'],
  },
])
