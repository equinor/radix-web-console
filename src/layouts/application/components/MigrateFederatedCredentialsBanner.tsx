import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Banner } from '../../../components/banner/Banner'
import { Dialog } from '../../../components/dialog/Dialog'
import { errorToast, successToast } from '../../../components/global-top-nav/styled-toaster'
import { externalUrls } from '../../../externalUrls'
import { pollingInterval } from '../../../store/defaults'
import {
  radixApi,
  useFederatedCredentialsMigratedAnnotationMutation,
  useGetApplicationQuery,
} from '../../../store/radix-api'
import type { AppDispatch } from '../../../store/store'

interface MigrateFederatedCredentialsBannerProps {
  currentApplication: string
}

/**
 * Temporary migration banner for a specific application.
 * Component mixes presentational and container logic, but is kept together for simplicity since it is temporary.
 *
 * Informs users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user confirms that they have updated their configuration.
 * Once confirmed, the banner will not be shown again for that user.
 * TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBanner = ({ currentApplication }: MigrateFederatedCredentialsBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { data: application, isLoading } = useGetApplicationQuery({ appName: currentApplication }, { pollingInterval })
  const [confirmFederatedCredentialsUpdated] = useFederatedCredentialsMigratedAnnotationMutation()

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const dismissBanner = () => {
    setIsDismissed(true)
  }

  const updateUserConfirmation = async () => {
    // Optimistically update
    const patch = dispatch(
      radixApi.util.updateQueryData('getApplication', { appName: currentApplication }, (draft) => {
        draft.registration.hasMigratedFederatedCredential = true
      })
    )

    try {
      await confirmFederatedCredentialsUpdated({ appName: currentApplication }).unwrap()
      successToast('User confirmation updated successfully.')
    } catch {
      patch.undo()
      errorToast('Failed to update user confirmation.')
    } finally {
      closeDialog()
    }
  }

  const hasMigratedFederatedCredential = application?.registration?.hasMigratedFederatedCredential

  if (isLoading || isDismissed || hasMigratedFederatedCredential) {
    return null
  }

  return (
    <>
      <Banner variant="warning" onDismiss={dismissBanner}>
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
