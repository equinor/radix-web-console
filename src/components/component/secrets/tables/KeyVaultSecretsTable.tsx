import { Table } from '@equinor/eds-core-react'
import { ComponentSecretStatusBadge } from '../../../status-badges'
import { useSortedSecrets } from '../useSortedSecrets'
import { EditSecretButton } from './edit-secret-button/EditSecretButton'
import type { SecretTableProps } from './secretTables.types'
import { getSecretDisplayName } from './secretTables.utils'
import { ViewAzureKeyVaultItemButton } from './view-azure-key-vault-item-button/ViewAzureKeyVaultItemButton'

export const KeyVaultSecretsTable = (props: SecretTableProps) => {
  const { appName, envName, componentName, secrets } = props
  const sortedSecrets = useSortedSecrets(secrets, undefined, 'ascending')

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell width={40} />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>KeyVault</Table.Cell>
          <Table.Cell width={150}>Status</Table.Cell>
          <Table.Cell width={24} />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedSecrets.map((secret) => (
          <Table.Row key={secret.name}>
            <Table.Cell className="fitwidth padding-right-0" />
            <Table.Cell>{getSecretDisplayName(secret)}</Table.Cell>
            <Table.Cell>{secret.resource}</Table.Cell>
            <Table.Cell>
              <ComponentSecretStatusBadge status={secret.status} />
            </Table.Cell>
            <Table.Cell>
              {secret.type === 'csi-azure-key-vault-item' ? (
                <ViewAzureKeyVaultItemButton secret={secret} {...{ appName, envName, componentName }} />
              ) : (
                <EditSecretButton
                  appName={appName}
                  componentName={componentName}
                  envName={envName}
                  secretName={secret.name}
                />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
