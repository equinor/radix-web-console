import { Button, TextField, Typography } from '@equinor/eds-core-react'
import { type ChangeEvent, type FunctionComponent, type ReactNode, useState } from 'react'

import type { BuildSecret, ImageHubSecret, Secret } from '../../store/radix-api'
import { SecretStatus } from '../secret-status'

import './style.css'
import { SecretUpdatedBadge } from '../status-badges/secret-updated-badge'

export const SecretForm: FunctionComponent<{
  secret: Secret | BuildSecret | ImageHubSecret
  updated?: string
  secretName: string
  overview?: ReactNode
  disableForm?: boolean
  disableSave?: boolean
  allowEmptyValue?: boolean
  /**
   * Save callback
   * @param value form value
   * @returns true to prevent or disallow saving the same value twice, or false/void to allow this behavior
   */
  onSave: (value: string) => Promise<boolean | undefined>
}> = ({ secret, secretName, overview, disableSave, disableForm, allowEmptyValue, updated, onSave }) => {
  const [value, setValue] = useState<{ current: string; previous?: string }>({
    current: '',
  })
  return (
    <div className="grid grid--gap-medium">
      {overview || (
        <Typography>
          Secret <strong>{secretName}</strong>
        </Typography>
      )}

      <div className="secret-status">
        <Typography>Status</Typography>
        <SecretStatus status={secret.status} />
      </div>

      <div className="secret-status">
        <Typography>Last changed</Typography>
        <SecretUpdatedBadge updated={updated} />
      </div>

      <div className="secret-overview-form">
        <form>
          <fieldset className="grid grid--gap-small" disabled={disableForm}>
            <TextField
              label="Secret value"
              value={value.current}
              multiline
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setValue((x) => ({ ...x, current: target.value }))
              }
              {...(secret.status === 'Consistent' && {
                helperText: 'Existing value will be overwritten',
              })}
            />

            <div>
              <Button
                type="submit"
                onClick={async () => {
                  setValue((x) => ({ ...x, previous: value.current }))
                  const result = await onSave(value.current)
                  if (result) {
                    // void or false, clear previous value to re-enable Save button
                    setValue(({ current }) => ({ current }))
                  }
                }}
                disabled={
                  !onSave ||
                  disableForm ||
                  disableSave ||
                  value.current === value.previous ||
                  (!allowEmptyValue && !(value.current?.length > 0))
                }
              >
                Save
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
