import { Button, Textarea, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import type { Secret } from '../../../../../store/radix-api'
import { Banner } from '../../../../banner/Banner'
import { LoadingButton } from '../../../../button/loading-button'
import { Dialog } from '../../../../dialog/Dialog'
import { successToast } from '../../../../global-top-nav/styled-toaster'
import { ComponentSecretStatusBadge } from '../../../../status-badges'
import { RelativeToNow } from '../../../../time/relative-to-now'
import { getSecretDisplayName } from '../secretTables.utils'
import { useSecret } from './useSecret'

interface EditSecretButtonProps {
  appName: string
  componentName: string
  envName: string
  secret: Secret
}

export const EditSecretButton = (props: EditSecretButtonProps) => {
  const { appName, componentName, envName, secret } = props

  const [value, setValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showErrorBanner, setShowErrorBanner] = useState(false)

  const { updateSecret } = useSecret({
    appName,
    envName,
    componentName,
    secretName: secret.name,
  })

  const closeDialog = () => {
    setValue('')
    setShowErrorBanner(false)
    setIsDialogOpen(false)
  }

  const onUpdateSecret = async () => {
    setShowErrorBanner(false)

    try {
      await updateSecret(value)
      successToast('Secret updated successfully')
      closeDialog()
    } catch {
      setShowErrorBanner(true)
    }
  }

  const displayName = getSecretDisplayName(secret)
  const isSaveDisabled = !value.length
  const textAreaHelperText = secret.status === 'Consistent' ? 'Existing value will be overwritten' : undefined

  return (
    <>
      <Button variant="ghost" onClick={() => setIsDialogOpen(true)} aria-label={`Edit secret ${displayName}`}>
        Edit
      </Button>

      <Dialog open={isDialogOpen} isDismissable onClose={closeDialog} contentAutoGap>
        <Dialog.Header>Edit Secret</Dialog.Header>
        <Dialog.Content>
          {showErrorBanner && <Banner variant="danger">An error occurred while updating the secret.</Banner>}
          <div>
            <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
              Name
            </Typography>
            <Typography>
              <b>{displayName}</b>
            </Typography>
          </div>

          {secret.updated && (
            <div>
              <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                Last Updated
              </Typography>{' '}
              <RelativeToNow time={secret.updated} />
            </div>
          )}

          <div>
            <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
              Status
            </Typography>
            <ComponentSecretStatusBadge status={secret.status} />
          </div>

          <Textarea
            label="Value"
            helperText={textAreaHelperText}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <LoadingButton onClick={onUpdateSecret} disabled={isSaveDisabled}>
            Update secret
          </LoadingButton>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
