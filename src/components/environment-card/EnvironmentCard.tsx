import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ActiveDeploymentInfo } from './components/ActiveDeploymentInfo'
import { BuildSourceInfo } from './components/BuildSourceInfo'
import { EnvironmentCardSection } from './components/EnvironmentCardSection'
import { EnvironmentCardSkeleton } from './components/EnvironmentCardSkeleton'
import { EnvironmentCardStatuses } from './components/environment-card-statuses/EnvironmentCardStatuses'
import { PublicComponentsList } from './components/PublicComponentsList'
import styles from './environmentCard.module.css'
import type {
  EnvironmentCardActiveDeployment,
  EnvironmentCardBuildSource,
  EnvironmentCardEnvironment,
  PublicComponent,
} from './environmentCard.types'
import { getBuildSourceView, truncatePublicComponents } from './environmentCard.utils'

interface EnvironmentCardProps {
  readonly isLoading?: boolean
  /** The statuses slot, typically an `<EnvironmentCard.Statuses />`. */
  readonly children?: ReactNode
  readonly environment: EnvironmentCardEnvironment
  readonly publicComponents: ReadonlyArray<PublicComponent>
  readonly activeDeployment?: EnvironmentCardActiveDeployment
  readonly buildSource: EnvironmentCardBuildSource
}

const EnvironmentCardRoot = (props: EnvironmentCardProps) => {
  const { environment, publicComponents, activeDeployment, buildSource, isLoading = false, children } = props

  // Early return skeleton before computing values
  if (isLoading) {
    return <EnvironmentCardSkeleton />
  }

  const truncatedPublicComponents = truncatePublicComponents(publicComponents)
  const publicComponentsHiddenText =
    truncatedPublicComponents.hiddenCount > 0 ? `(+${truncatedPublicComponents.hiddenCount} more)` : undefined

  const buildSourceView = getBuildSourceView(buildSource)

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

        {children}
      </header>

      <div className={styles.body}>
        <EnvironmentCardSection title="Public components" subtitle={publicComponentsHiddenText}>
          <PublicComponentsList publicComponents={truncatedPublicComponents.visible} />
        </EnvironmentCardSection>

        <EnvironmentCardSection title="Active deployment">
          <ActiveDeploymentInfo deployment={activeDeployment} />
        </EnvironmentCardSection>

        <EnvironmentCardSection title="Source" subtitle={buildSourceView.subtitle}>
          {buildSourceView.icon && <Icon size={18} data={buildSourceView.icon} className={styles.icon} />}
          <BuildSourceInfo url={buildSourceView.url} label={buildSourceView.label} />
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

export const EnvironmentCard = Object.assign(EnvironmentCardRoot, {
  Statuses: EnvironmentCardStatuses,
})
