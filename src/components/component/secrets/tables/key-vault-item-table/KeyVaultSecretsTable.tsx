import { Table, Typography } from '@equinor/eds-core-react'
import { isKeyVaultItem } from '../../../../../domain/key-vault/keyVault.utils'
import { ComponentSecretStatusBadge } from '../../../../status-badges'
import { EditSecretButton } from '../edit-secret-button/EditSecretButton'
import type { SecretTableProps } from '../secretTables.types'
import { getSecretDisplayName } from '../secretTables.utils'
import { ViewAzureKeyVaultItemButton } from '../view-azure-key-vault-item-button/ViewAzureKeyVaultItemButton'
import { KeyVaultAuthMethodBadge } from './KeyVaultAuthMethodBadge'
import { KeyVaultIssuePopover } from './KeyVaultIssuePopover'
import { KeyVaultItemStatusBadge } from './KeyVaultItemStatusBadge'
import styles from './keyVaultSecretsTable.module.css'
import { buildKeyVaultTableGroups } from './keyVaultSecretsTable.utils'

export const KeyVaultSecretsTable = (props: SecretTableProps) => {
  const { appName, envName, componentName, secrets } = props

  const vaultGroups = buildKeyVaultTableGroups(secrets)

  return (
    <div className={styles.groups}>
      {vaultGroups.map((group) => (
        <section key={group.vaultName} className={styles.vault}>
          <div className={styles.vaultHeader}>
            <Typography variant="h6" as="h3" token={{ fontWeight: 'bold' }}>
              {group.vaultName || 'Key Vault'}
            </Typography>

            <KeyVaultAuthMethodBadge vaultSecrets={group.secrets} />

            {group.issue && <KeyVaultIssuePopover issue={group.issue} />}
          </div>

          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell width={40} />
                <Table.Cell>Name</Table.Cell>
                <Table.Cell width={150}>Status</Table.Cell>
                <Table.Cell width={24} />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {group.secrets.map((secret) => (
                <Table.Row key={secret.name}>
                  <Table.Cell className="fitwidth padding-right-0" />
                  <Table.Cell>{getSecretDisplayName(secret)}</Table.Cell>
                  <Table.Cell>
                    {isKeyVaultItem(secret) ? (
                      <KeyVaultItemStatusBadge status={secret.status} />
                    ) : (
                      <ComponentSecretStatusBadge status={secret.status} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isKeyVaultItem(secret) ? (
                      <ViewAzureKeyVaultItemButton secret={secret} {...{ appName, envName, componentName }} />
                    ) : (
                      <EditSecretButton
                        appName={appName}
                        componentName={componentName}
                        envName={envName}
                        secret={secret}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
      ))}
    </div>
  )
}
