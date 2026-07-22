import { Button, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { pollingInterval } from '../../store/defaults'
import {
  radixApi,
  useFederatedCredentialsMigratedAnnotationMutation,
  useGetApplicationQuery,
} from '../../store/radix-api'
import type { AppDispatch } from '../../store/store'
import { Banner } from '../banner/Banner'
import { Dialog } from '../dialog/Dialog'
import { errorToast, successToast } from '../global-top-nav/styled-toaster'
import { ExternalLink } from '../link/external-link'
import { migrateFederatedCredentialsGuideUrl } from './migrateFederatedCredentialsBanner.const'

interface MigrateFederatedCredentialsBannerAppProps {
  currentApplication: string
  className?: string
}

/**
 * Temporary migration banner for a specific application.
 * Component mixes presentational and container logic, but is kept together for simplicity since it is temporary.
 *
 * Warns users about the cluster migration and prompts them to update their configuration.
 * The banner will be displayed until the user confirms that they have updated their configuration.
 * Once confirmed, the banner will not be shown again for that user.
 * TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations.
 */
export const MigrateFederatedCredentialsBannerApp = ({
  currentApplication,
  className,
}: MigrateFederatedCredentialsBannerAppProps) => {
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
      <Banner variant="warning" onDismiss={dismissBanner} className={className}>
        <Banner.Title>Action Required: Check migration readiness</Banner.Title>
        <Banner.Message>
          Please read the <ExternalLink href={migrateFederatedCredentialsGuideUrl}>migration guide</ExternalLink> to see
          if the cluster migration applies to {currentApplication}, then confirm by 31 August 2026 once you have
          reviewed or updated the configuration.
        </Banner.Message>
        <Banner.Actions>
          <Button onClick={() => setIsDialogOpen(true)}>Confirm review</Button>
        </Banner.Actions>
      </Banner>

      <Dialog open={isDialogOpen} isDismissable onClose={closeDialog} contentAutoGap>
        <Dialog.Header>
          <Dialog.Title>Confirm configuration review</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography>
            Confirm that you have reviewed the <strong>{currentApplication}</strong> configuration and updated it, if
            needed, for the cluster migration.
          </Typography>
          <Typography>After you confirm, this message will not be shown again.</Typography>
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
