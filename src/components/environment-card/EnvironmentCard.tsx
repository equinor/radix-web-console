import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import { Link } from 'react-router'
import { ActiveDeploymentInfo } from './components/ActiveDeploymentInfo'
import { BuildSourceLabel } from './components/BuildSourceLabel'
import { EnvironmentCardSection } from './components/EnvironmentCardSection'
import { EnvironmentCardSkeleton } from './components/EnvironmentCardSkeleton'
import { EnvironmentCardStatuses } from './components/environment-card-statuses/EnvironmentCardStatuses'
import { PublicComponentsList } from './components/PublicComponentsList'
import styles from './environmentCard.module.css'
import type {
  EnvironmentCardActiveDeployment,
  EnvironmentCardBuildSource,
  EnvironmentCardEnvironment,
  EnvironmentCardPublicComponents,
  EnvironmentCardStatusData,
} from './environmentCard.types'

interface EnvironmentCardProps {
  readonly environment: EnvironmentCardEnvironment
  readonly publicComponents: EnvironmentCardPublicComponents
  readonly activeDeployment?: EnvironmentCardActiveDeployment
  readonly buildSource: EnvironmentCardBuildSource
  readonly statuses: EnvironmentCardStatusData
  readonly isLoading?: boolean
}

export const EnvironmentCard = (props: EnvironmentCardProps) => {
  const { environment, publicComponents, activeDeployment, buildSource, statuses, isLoading = false } = props

  if (isLoading) {
    return <EnvironmentCardSkeleton />
  }
  return (
    <article className={styles.environmentCard}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span>{environment.name}</span>
          {environment.isOrphan && (
            <Typography group="ui" variant="chip__badge" token={{ fontStyle: 'italic' }}>
              Orphan environment
            </Typography>
          )}
        </div>

        <EnvironmentCardStatuses
          environmentName={environment.name}
          deploymentStatus={activeDeployment?.status}
          components={statuses.components}
          envScan={statuses.envScan}
          utilization={statuses.utilization}
        />
      </header>

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

      <footer className={styles.footer}>
        <Button variant="ghost" as={Link} to={environment.url}>
          View details
          <Icon data={arrow_forward} />
        </Button>
      </footer>
    </article>
  )
}
