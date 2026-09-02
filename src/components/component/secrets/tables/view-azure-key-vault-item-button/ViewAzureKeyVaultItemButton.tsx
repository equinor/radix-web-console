import { Button, Icon, Table, Typography } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import { clsx } from 'clsx'
import { useState } from 'react'
import {
  type AzureKeyVaultSecretVersion,
  type Secret,
  useGetAzureKeyVaultSecretVersionsQuery,
} from '../../../../../store/radix-api'
import AsyncResource from '../../../../async-resource/async-resource'
import { Dialog } from '../../../../dialog/Dialog'
import { ComponentSecretStatusBadge } from '../../../../status-badges'
import { Duration } from '../../../../time/duration'
import styles from './viewAzureKeyVaultItemButton.module.css'
import { consumerSecretName } from './viewAzureKeyVaultItemButton.utils'

interface ConsumerSecretCreatedProps {
  item: AzureKeyVaultSecretVersion
}

const ConsumerSecretCreated = ({ item }: ConsumerSecretCreatedProps) => {
  const { replicaCreated, replicaName, batchCreated, batchName, jobCreated, jobName } = item

  if (batchName && batchName.length > 0) {
    return <Duration start={batchCreated} end={new Date()} />
  }
  if (jobName && jobName.length > 0) {
    return <Duration start={jobCreated} end={new Date()} />
  }
  if (replicaName.toLowerCase() === 'new jobs') {
    return <></>
  }
  return <Duration start={new Date(replicaCreated)} end={new Date()} />
}

interface AzureKeyVaultItemProps {
  readonly appName: string
  readonly envName: string
  readonly componentName: string
  readonly secret: Pick<Secret, 'resource' | 'id' | 'status'>
}
export const ViewAzureKeyVaultItemButton = ({ appName, envName, componentName, secret }: AzureKeyVaultItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data, ...asyncState } = useGetAzureKeyVaultSecretVersionsQuery(
    {
      appName,
      envName,
      componentName,
      azureKeyVaultName: secret.resource!,
      secretName: secret.id,
    },
    {
      skip: !isDialogOpen || !appName || !envName || !componentName || !secret.resource || !secret.id,
      pollingInterval: 8000,
    }
  )

  const filteredData = (data || []).filter(
    ({ batchName, version }, i, arr) =>
      // avoid showing duplicate secrets for job pods with same batchName and version
      !batchName || arr.findIndex((y) => y.batchName === batchName && y.version === version) === i
  )

  return (
    <>
      <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
        View
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} isDismissable>
        <Dialog.Header>{`${secret.resource}: ${secret.id}`}</Dialog.Header>
        <Dialog.Content>
          <AsyncResource asyncState={asyncState}>
            <div className={clsx(styles.content, 'grid--table-overflow')}>
              <div className="secret-status">
                <Typography>Status</Typography>
                <ComponentSecretStatusBadge status={secret.status} />
              </div>

              {filteredData?.length > 0 ? (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>Version</Table.Cell>
                      <Table.Cell>Consumer</Table.Cell>
                      <Table.Cell>Consumer created</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {filteredData.map((x) => (
                      <Table.Row key={`${x.version}-${x.batchName ?? x.jobName ?? x.replicaName}`}>
                        <Table.Cell>{x.version}</Table.Cell>
                        <Table.Cell>
                          <Typography as="span">{consumerSecretName(x.replicaName, x.batchName, x.jobName)}</Typography>
                        </Table.Cell>
                        <Table.Cell>
                          <ConsumerSecretCreated item={x} />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <div className={styles.contentEmpty}>
                  <Icon data={info_circle} />
                  <Typography>No replicas use this secret</Typography>
                </div>
              )}
            </div>
          </AsyncResource>
        </Dialog.Content>
      </Dialog>
    </>
  )
}
