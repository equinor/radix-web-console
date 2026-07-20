import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Banner } from '../../../components/banner/Banner'
import { externalUrls } from '../../../externalUrls'
import { useLocalStorage } from '../../../hooks/use-local-storage'

// This should have been in use-local-storage.ts, but it is only temporary, so it is defined here for now.
const hideMigrateFederatedCredentialsBanner = 'hideMigrateFederatedCredentialsBanner'

/**
 * Temporary migration banner for all applications.
 * Informs users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user hides the banner.
 * TODO: ##1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBanner = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isConfigUpdated, setIsConfigUpdated] = useLocalStorage(hideMigrateFederatedCredentialsBanner, false)

  const dismissBanner = () => {
    setIsVisible(false)
  }

  if (!isVisible || isConfigUpdated) {
    return null
  }

  return (
    <Banner className={className} variant="warning" onDismiss={dismissBanner}>
      <Banner.Title>Action required: Cluster migration</Banner.Title>
      <Banner.Message>
        We're migrating our clusters. Update your configuration before 30 August 2026 to keep your applications running.
        Applications that aren't updated will stop working. See the{' '}
        <Typography
          link
          href={externalUrls.migrateFederatedCredentialsGuide}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          migration guide
        </Typography>{' '}
        for details.
      </Banner.Message>
      <Banner.Actions>
        <Button href={externalUrls.migrateFederatedCredentialsGuide} target="_blank" rel="noopener noreferrer">
          Read migration guide
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setIsConfigUpdated(true)
          }}
        >
          Do not show again
        </Button>
      </Banner.Actions>
    </Banner>
  )
}
