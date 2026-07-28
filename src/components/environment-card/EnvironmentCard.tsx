import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_forward, language, send } from '@equinor/eds-icons'
import { Link } from 'react-router'
import type { Component, ReplicaResourcesUtilizationResponse } from '../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../store/scan-api'
import { smallDeploymentName } from '../../utils/string'
import { ExternalLink } from '../link/external-link'
import { RelativeToNow } from '../time/relative-to-now'
import { EnvironmentCardSection } from './components/EnvironmentCardSection'
import { EnvironmentCardStatuses } from './components/EnvironmentCardStatuses'
import styles from './environmentCard.module.css'
import type { EnvironmentCardBuildSource, EnvironmentCardPublicComponent } from './environmentCard.types'

interface EnvironmentCardProps {
  readonly environment: {
    readonly name: string
    readonly url: string
  }
  readonly publicComponents: {
    readonly visible: ReadonlyArray<EnvironmentCardPublicComponent>
    readonly subtitle?: string
  }
  readonly activeDeployment?: {
    readonly name: string
    readonly activeFrom: string
    readonly status: string
    readonly url: string
  }
  readonly buildSource: EnvironmentCardBuildSource
  readonly statuses: {
    readonly components?: Component[]
    readonly envScan?: EnvironmentVulnerabilities
    readonly utilization?: ReplicaResourcesUtilizationResponse
  }
}

const BuildSourceLabel = ({ url, label }: Pick<EnvironmentCardBuildSource, 'url' | 'label'>) => {
  if (!url) {
    return (
      <Typography as="span" color="disabled">
        {label}
      </Typography>
    )
  }

  if (url.showAsExternalUrl) {
    return <ExternalLink href={url.path}>{label}</ExternalLink>
  }

  return (
    <Typography as={Link} to={url.path} link>
      {label}
    </Typography>
  )
}

const PublicComponentItem = ({ component }: { component: EnvironmentCardPublicComponent }) => (
  <li className={styles.publicComponent}>
    <Icon size={18} data={language} className={styles.icon} />
    <ExternalLink href={component.url}>{component.name}</ExternalLink>
  </li>
)

const ActiveDeploymentInfo = ({ deployment }: { deployment?: EnvironmentCardProps['activeDeployment'] }) => {
  if (!deployment) {
    return <Typography color="disabled">No active deployment</Typography>
  }

  return (
    <>
      <Icon size={18} data={send} className={styles.icon} />
      <Typography as={Link} to={deployment.url} link>
        {smallDeploymentName(deployment.name)}
      </Typography>{' '}
      <span className={styles.secondaryText}>
        (<RelativeToNow time={deployment.activeFrom} titlePrefix="Deployed" capitalize />)
      </span>
    </>
  )
}

const PublicComponentsList = ({ publicComponents }: { publicComponents: EnvironmentCardProps['publicComponents'] }) => {
  if (publicComponents.visible.length === 0) {
    return <Typography color="disabled">No public components available</Typography>
  }

  return (
    <ul>
      {publicComponents.visible.map((component) => (
        <PublicComponentItem key={component.name} component={component} />
      ))}
    </ul>
  )
}

export const EnvironmentCard = ({
  environment,
  publicComponents,
  activeDeployment,
  buildSource,
  statuses,
}: EnvironmentCardProps) => (
  <div className={styles.environmentCard}>
    <div className={styles.header}>
      <span>{environment.name}</span>
      <div>
        <EnvironmentCardStatuses
          environmentName={environment.name}
          deployment={activeDeployment ? { status: activeDeployment.status } : undefined}
          components={statuses.components}
          envScan={statuses.envScan}
          utilization={statuses.utilization}
        />
      </div>
    </div>

    <div className={styles.body}>
      <EnvironmentCardSection title="Public components" subtitle={publicComponents.subtitle}>
        <PublicComponentsList publicComponents={publicComponents} />
      </EnvironmentCardSection>

      <EnvironmentCardSection title="Active deployment">
        <ActiveDeploymentInfo deployment={activeDeployment} />
      </EnvironmentCardSection>

      <EnvironmentCardSection title="Source" subtitle={buildSource.subtitle}>
        {buildSource.icon && <Icon size={18} data={buildSource.icon} className={styles.icon} />}
        <BuildSourceLabel url={buildSource.url} label={buildSource.label} />
      </EnvironmentCardSection>
    </div>

    <div className={styles.footer}>
      <Button variant="ghost" as={Link} to={environment.url}>
        View details
        <Icon data={arrow_forward} />
      </Button>
    </div>
  </div>
)
