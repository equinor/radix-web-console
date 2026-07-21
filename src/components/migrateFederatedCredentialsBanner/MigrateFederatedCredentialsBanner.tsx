import { configVariables } from '../../utils/config'
import { MigrateFederatedCredentialsBannerApp } from './MigrateFederatedCredentialsBannerApp'
import { MigrateFederatedCredentialsBannerOverview } from './MigrateFederatedCredentialsBannerOverview'
import { AFFECTED_CLUSTER_NAMES } from './migrateFederatedCredentialsBanner.const'

interface MigrateFederatedCredentialsBannerProps {
  currentApplication?: string
  className?: string
}

/**
 * Temporary migration banner for a specific application or applications overview.
 * Decides which banner to render based on the presence of a currentApplication prop.
 * Only visible in specific clusters defined in AFFECTED_CLUSTER_NAMES.
 *
 * TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBanner = (props: MigrateFederatedCredentialsBannerProps) => {
  const { currentApplication, className } = props

  if (configVariables.RADIX_CLUSTERNAME && !AFFECTED_CLUSTER_NAMES.includes(configVariables.RADIX_CLUSTERNAME)) {
    return null
  }
  if (currentApplication) {
    return <MigrateFederatedCredentialsBannerApp currentApplication={currentApplication} className={className} />
  }
  return <MigrateFederatedCredentialsBannerOverview className={className} />
}
