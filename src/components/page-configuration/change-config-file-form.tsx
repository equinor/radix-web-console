import { Accordion, Button, CircularProgress, TextField, Typography } from '@equinor/eds-core-react'
import { type ChangeEvent, type FormEvent, type FunctionComponent, useState } from 'react'

import { useModifyRegistrationDetailsMutation } from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { Alert } from '../alert'
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster'

export interface ChangeConfigFileFormProps {
  appName: string
  radixConfigFullName?: string
  refetch?: () => unknown
}

const defaultConfigName = 'radixconfig.yaml'

export const ChangeConfigFileForm: FunctionComponent<ChangeConfigFileFormProps> = ({
  appName,
  radixConfigFullName,
  refetch,
}) => {
  const [configNameState, setConfigNameState] = useState<string>()
  const [mutate, { isLoading, error }] = useModifyRegistrationDetailsMutation()

  const handleSubmit = handlePromiseWithToast(async (ev: FormEvent) => {
    ev.preventDefault()

    await mutate({
      appName,
      applicationRegistrationPatchRequest: {
        applicationRegistrationPatch: {
          radixConfigFullName: configNameState,
        },
      },
    }).unwrap()

    await refetch?.()
  })

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change config file</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {error && (
                <div>
                  <Alert type="danger">Failed to change config file. {getFetchErrorMessage(error)}</Alert>
                </div>
              )}
              <TextField
                id="filepath"
                disabled={isLoading}
                value={configNameState ?? radixConfigFullName ?? defaultConfigName ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfigNameState(e.target.value)}
                label="URL"
                helperText="e.g. 'path/radixconfig.yaml"
              />
              {isLoading ? (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              ) : (
                <div>
                  <Button
                    color="danger"
                    type="submit"
                    disabled={
                      !!(radixConfigFullName === configNameState || (configNameState && configNameState.length < 5))
                    }
                  >
                    Change config file
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
