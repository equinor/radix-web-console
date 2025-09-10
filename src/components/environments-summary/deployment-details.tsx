import { Icon, Typography } from '@equinor/eds-core-react'
import { link, send } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import type { DeploymentSummary } from '../../store/radix-api'
import { getAppDeploymentUrl } from '../../utils/routing'
import { RelativeToNow } from '../time/relative-to-now'

type DeploymentDetailsProps = {
  appName: string
  deployment?: Pick<DeploymentSummary, 'activeFrom' | 'name'>
}
export const DeploymentDetails = ({ appName, deployment }: DeploymentDetailsProps) =>
  !deployment ? (
    <Typography color="disabled">
      <Icon data={link} style={{ marginRight: 'var(--eds_spacing_small)' }} />
      No active deployment
    </Typography>
  ) : (
    <Typography as={Link} to={getAppDeploymentUrl(appName, deployment.name)} link token={{ textDecoration: 'none' }}>
      <Icon data={send} style={{ marginRight: 'var(--eds_spacing_small)' }} />
      <Typography as="span" color="primary">
        deployment{' '}
        <Typography as="span" color="gray">
          (<RelativeToNow time={new Date(deployment.activeFrom)} />)
        </Typography>
      </Typography>
    </Typography>
  )
