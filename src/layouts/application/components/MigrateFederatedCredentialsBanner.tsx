import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { Banner } from '../../../components/banner/Banner'
import { Dialog } from '../../../components/dialog/Dialog'
import { errorToast, successToast } from '../../../components/global-top-nav/styled-toaster'
import { externalUrls } from '../../../externalUrls'
import { useFederatedCredentialsMigratedAnnotationMutation } from '../../../store/radix-api'

interface MigrateFederatedCredentialsBannerProps {
  className?: string
  currentApplication: string
}

/**
 * Temporary migration banner for a specific application.
 * Informs users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user confirms that they have updated their configuration.
 * Once confirmed, the banner will not be shown again for that user.
 * TODO: ##1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBanner = ({
  className,
  currentApplication,
}: MigrateFederatedCredentialsBannerProps) => {
  const [federatedCredentialsMigratedAnnotation] = useFederatedCredentialsMigratedAnnotationMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false) // TODO: Check if needed

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const updateUserConfirmation = async () => {
    try {
      await federatedCredentialsMigratedAnnotation({ appName: currentApplication }).unwrap()
      successToast('User confirmation updated successfully.')
      setIsUpdateConfirmed(true)
    } catch {
      errorToast('Failed to update user confirmation.')
    } finally {
      closeDialog()
    }
  }

  if (isUpdateConfirmed) {
    return null
  }

  return (
    <>
      <Banner className={className} variant="warning">
        <Banner.Title>Action required: {currentApplication} is not updated yet</Banner.Title>
        <Banner.Message>
          <strong>{currentApplication}</strong> still needs to be updated for our cluster migration. Update the
          configuration before 30 August 2026 to keep it running. Applications that aren't updated will stop working.
          See the{' '}
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
          <Button onClick={() => setIsDialogOpen(true)}>Mark application as updated</Button>
        </Banner.Actions>
      </Banner>

      <Dialog open={isDialogOpen} isDismissable onClose={closeDialog} contentAutoGap>
        <Dialog.Header>
          <Dialog.Title>Confirm configuration update</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography>
            By confirming, you acknowledge that you have updated the <strong>{currentApplication}</strong> configuration
            and are aware of the cluster migration.
          </Typography>
          <Typography>This message will not be shown again once you confirm the update.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button onClick={updateUserConfirmation}>I confirm</Button>
          <Button variant="outlined" onClick={closeDialog}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
