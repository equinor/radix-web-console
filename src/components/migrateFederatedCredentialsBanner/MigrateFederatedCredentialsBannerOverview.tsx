import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { Banner } from '../banner/Banner'
import {
  hideMigrateFederatedCredentialsBanner,
  migrateFederatedCredentialsGuideUrl,
} from './migrateFederatedCredentialsBanner.const'

/**
 * Temporary migration banner for applications overview.
 * Informs users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user hides the banner.
 * TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBannerOverview = ({ className }: { className?: string }) => {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false)
  const [isBannerHiddenInLocalStorage, setIsBannerHiddenInLocalStorage] = useLocalStorage(
    hideMigrateFederatedCredentialsBanner,
    false
  )

  const dismissBanner = () => {
    setIsBannerDismissed(true)
  }

  const hideBannerInLocalStorage = () => {
    setIsBannerHiddenInLocalStorage(true)
  }

  if (isBannerDismissed || isBannerHiddenInLocalStorage) {
    return null
  }

  return (
    <Banner className={className} variant="info" onDismiss={dismissBanner}>
      <Banner.Title>Scheduled migration</Banner.Title>
      <Banner.Message>
        We're migrating our clusters. Update your configuration before 30 August 2026 to keep your application running.
        Applications that aren't updated will stop working. See the{' '}
        <Typography
          link
          href={migrateFederatedCredentialsGuideUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          migration guide
        </Typography>{' '}
        for details.
      </Banner.Message>
      <Banner.Actions>
        <Button href={migrateFederatedCredentialsGuideUrl} target="_blank" rel="noopener noreferrer">
          Read migration guide
        </Button>
        <Button variant="outlined" onClick={hideBannerInLocalStorage}>
          Do not show again
        </Button>
      </Banner.Actions>
    </Banner>
  )
}
