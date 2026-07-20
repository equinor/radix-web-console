import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Banner } from '../../../components/banner/Banner'
import { Dialog } from '../../../components/dialog/Dialog'
import { externalUrls } from '../../../externalUrls'
import { useLocalStorage } from '../../../hooks/use-local-storage'

const temporaryUrl = externalUrls.referenceRadixConfig
// This should have been in use-local-storage.ts, but it is only temporary, so it is defined here for now.
const userHasConfirmedClusterMigrationUpdateKey = 'userHasConfirmedClusterMigration'

/**
 * A temporary banner that informs users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user confirms that they have updated their configuration.
 * Once confirmed, the banner will not be shown again for that user.
 * TODO: This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const TemporaryClusterMigrationBanner = ({ className }: { className?: string }) => {
  const [isConfigUpdated, setIsConfigUpdated] = useLocalStorage(userHasConfirmedClusterMigrationUpdateKey, false)
  const [isVisible, setIsVisible] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const dismissBanner = () => {
    setIsVisible(false)
  }

  const updateUserConfirmation = () => {
    setIsConfigUpdated(true)
    setIsDialogOpen(false)
  }

  if (!isVisible || isConfigUpdated) {
    return null
  }

  return (
    <>
      <Banner className={className} variant="warning" onDismiss={dismissBanner}>
        <Banner.Title>Action required: Cluster migration</Banner.Title>
        <Banner.Message>
          We're migrating our clusters. Update your configuration before 30 August 2026 to keep your applications
          running. Applications that aren't updated will stop working. See the{' '}
          <Typography link href={temporaryUrl} target="_blank" rel="noopener noreferrer" color="inherit">
            migration guide
          </Typography>{' '}
          for details.
        </Banner.Message>
        <Banner.Actions>
          <Button onClick={() => setIsDialogOpen(true)}>I have updated my configurations</Button>
        </Banner.Actions>
      </Banner>

      <Dialog open={isDialogOpen} isDismissable onClose={() => setIsDialogOpen(false)} contentAutoGap>
        <Dialog.Header>
          <Dialog.Title>Confirm configurations update</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography>
            By confirming, you acknowledge that you have updated your configurations and are aware of the cluster
            migration.
          </Typography>
          <Typography>This banner will not be shown again once you confirm the update.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={updateUserConfirmation}>I confirm</Button>
          <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
