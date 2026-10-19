import { Button, Table, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { type Secret, useGetAzureKeyVaultSecretVersionsQuery } from '../../../../../store/radix-api'
import AsyncResource from '../../../../async-resource/async-resource'
import { Banner } from '../../../../banner/Banner'
import { Dialog } from '../../../../dialog/Dialog'
import { KeyVaultItemStatusBadge } from '../../../../status-badges'
import { Duration } from '../../../../time/duration'
import { extractKey, formatVaultItem, removeDuplicateBatchVaultItems } from './viewAzureKeyVaultItemButton.utils'

interface AzureKeyVaultItemProps {
  readonly appName: string
  readonly envName: string
  readonly componentName: string
  readonly secret: Pick<Secret, 'resource' | 'id' | 'status'>
}
export const ViewAzureKeyVaultItemButton = (props: AzureKeyVaultItemProps) => {
  const { appName, envName, componentName, secret } = props

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data, ...asyncState } = useGetAzureKeyVaultSecretVersionsQuery(
    {
      appName,
      envName,
      componentName,
      azureKeyVaultName: secret.resource ?? '',
      secretName: secret.id,
    },
    {
      skip: !isDialogOpen || !appName || !envName || !componentName || !secret.resource || !secret.id,
      pollingInterval: 8000,
    }
  )

  const filteredData = removeDuplicateBatchVaultItems(data)
  const formattedData = filteredData.map(formatVaultItem)

  const { keyType, key } = extractKey(secret.id)

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsDialogOpen(true)}
        aria-label={`View Azure Key Vault item ${secret.id}`}
      >
        View
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} isDismissable contentAutoGap>
        <Dialog.Header>Azure Key Vault Item</Dialog.Header>

        <Dialog.Content>
          <AsyncResource asyncState={asyncState}>
            <>
              <div>
                <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                  Key Vault
                </Typography>
                <Typography>
                  <b>{secret.resource}</b>
                </Typography>
              </div>
              <div className="grid grid--same-width-columns">
                <div>
                  <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                    Name
                  </Typography>
                  <Typography>
                    <b>{key}</b>
                  </Typography>
                </div>
                <div>
                  <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                    Type
                  </Typography>
                  <Typography>
                    <b>{keyType}</b>
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                  Status
                </Typography>
                <KeyVaultItemStatusBadge status={secret.status} />
              </div>
            </>
            <div className="grid--table-overflow">
              {formattedData?.length > 0 ? (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Version</Table.Cell>
                      <Table.Cell>Consumer</Table.Cell>
                      <Table.Cell>Consumer created</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {formattedData.map((item) => (
                      <Table.Row key={`${item.version}-${item.consumer}`}>
                        <Table.Cell>{item.version}</Table.Cell>
                        <Table.Cell>
                          <Typography as="span">{item.consumer}</Typography>
                        </Table.Cell>
                        <Table.Cell>
                          {item.consumerCreated && <Duration start={item.consumerCreated} end={new Date()} />}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Banner>
                  <Typography>No replicas use this key vault item.</Typography>
                </Banner>
              )}
            </div>
          </AsyncResource>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
