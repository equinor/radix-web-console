import { Button, Textarea, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import AsyncResource from '../../../../async-resource/async-resource'
import { LoadingButton } from '../../../../button/loading-button'
import { Dialog } from '../../../../dialog/Dialog'
import { RelativeToNow } from '../../../../time/relative-to-now'
import { useSecret } from './useSecret'

interface EditSecretButtonProps {
  appName: string
  componentName: string
  envName: string
  secretName: string
}

export const EditSecretButton = (props: EditSecretButtonProps) => {
  const { appName, componentName, envName, secretName } = props

  const [value, setValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { secret, fetchSecretsState, updateSecret } = useSecret({
    appName,
    envName,
    componentName,
    secretName,
  })

  const closeDialog = () => {
    setValue('')
    setIsDialogOpen(false)
  }

  const onUpdateSecret = async () => {
    await updateSecret(value)
    closeDialog()
  }

  const isSaveDisabled = !value.length
  const textAreaHelperText = secret?.status === 'Consistent' ? 'Existing value will be overwritten' : undefined

  return (
    <>
      <Button variant="ghost" onClick={() => setIsDialogOpen(true)}>
        Edit
      </Button>

      <Dialog open={isDialogOpen} isDismissable onClose={closeDialog} contentAutoGap>
        <Dialog.Header>Edit Secret</Dialog.Header>
        <Dialog.Content>
          <AsyncResource asyncState={fetchSecretsState}>
            {secret && (
              <>
                <div>
                  <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                    Secret Key
                  </Typography>
                  <Typography>
                    <b>{secret.name}</b>
                  </Typography>
                </div>

                {secret?.updated && (
                  <div>
                    <Typography variant="label" group="input" color="var(--eds_text_static_icons__tertiary)">
                      Last Updated
                    </Typography>{' '}
                    <RelativeToNow time={secret.updated} />
                  </div>
                )}

                <Textarea
                  label="Secret Value"
                  helperText={textAreaHelperText}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </>
            )}
          </AsyncResource>
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
