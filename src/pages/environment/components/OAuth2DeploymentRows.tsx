import { Icon, Table, Typography } from '@equinor/eds-core-react'
import { security } from '@equinor/eds-icons'
import { ComponentStatusBadge } from '../../../components/status-badges'
import type { OAuth2AuxiliaryResource, ReplicaSummary } from '../../../store/radix-api'
import { getOAuthServiceTitle } from '../../../utils/oauth'
import { getOAuthReplicaUrl } from '../../../utils/routing'
import { ReplicaLinks } from './ReplicaLinks'

interface OAuth2DeploymentRowsProps {
  readonly appName: string
  readonly envName: string
  readonly componentName: string
  readonly oauth2: Readonly<OAuth2AuxiliaryResource>
}

export const OAuth2DeploymentRows = (props: OAuth2DeploymentRowsProps) => {
  const { appName, envName, componentName, oauth2 } = props

  return (
    <>
      {oauth2.deployments?.map((deployment) => (
        <Table.Row key={deployment.type}>
          <Table.Cell />
          <Table.Cell>
            <div className="grid grid--gap-x-small grid--auto-columns grid--align-center">
              <Icon data={security} color="gray" />
              <Typography>OAuth2 {getOAuthServiceTitle(deployment.type)}</Typography>
            </div>
          </Table.Cell>
          <Table.Cell>
            <ComponentStatusBadge status={deployment.status} />
          </Table.Cell>
          <Table.Cell>
            <ReplicaLinks
              replicaList={deployment.replicaList}
              urlFunc={(replica: ReplicaSummary) =>
                getOAuthReplicaUrl(appName, envName, componentName, replica.name, deployment.type)
              }
            />
          </Table.Cell>
          <Table.Cell />
          <Table.Cell />
        </Table.Row>
      ))}
    </>
  )
}
