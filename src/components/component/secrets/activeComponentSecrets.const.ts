import { GenericSecretsTable } from './tables/GenericSecretsTable'
import { KeyVaultSecretsTable } from './tables/KeyVaultSecretsTable'
import type { SecretTableGroup } from './tables/secretTables.types'
import { VolumeMountSecretsTable } from './tables/VolumeMountSecretsTable'

export const SECRET_GROUPING: ReadonlyArray<SecretTableGroup> = Object.freeze([
  {
    title: 'Secrets',
    Component: GenericSecretsTable,
    types: ['generic'],
  },
  {
    title: 'Volume Mounts',
    Component: VolumeMountSecretsTable,
    types: ['csi-azure-blob-volume', 'azure-blob-fuse-volume'],
  },
  {
    title: 'Key Vaults',
    Component: KeyVaultSecretsTable,
    types: ['csi-azure-key-vault-creds', 'csi-azure-key-vault-item'],
  },
  {
    title: 'OAuth2',
    Component: GenericSecretsTable,
    types: ['oauth2-proxy'],
  },
])
