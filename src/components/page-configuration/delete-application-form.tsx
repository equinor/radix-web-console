import { Accordion, Button, Icon, TextField, Typography } from '@equinor/eds-core-react'
import { warning_outlined } from '@equinor/eds-icons'
import { type ChangeEvent, useState } from 'react'

import { Alert } from '../alert'
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster'
import { ScrimPopup } from '../scrim-popup'

import './style.css'
import { useNavigate } from 'react-router'
import { useMsalAccountLocalStorage } from '../../hooks/use-local-storage'
import { routes } from '../../routes'
import { useDeleteApplicationMutation } from '../../store/radix-api'

interface Props {
  appName: string
}

export default function DeleteApplicationForm({ appName }: Props) {
  const [mutate] = useDeleteApplicationMutation()
  const [inputValue, setInputValue] = useState('')
  const [visibleScrim, setVisibleScrim] = useState(false)
  const navigate = useNavigate()

  const [, setFavourites] = useMsalAccountLocalStorage<Array<string>>('favouriteApplications', [])
  const [, setKnownAppNames] = useMsalAccountLocalStorage<Array<string>>('knownApplications', [])

  const deleteAppNameFromLocalStorage = (appName: string) => {
    setKnownAppNames((old) => old.filter((name) => name != appName))
    setFavourites((old) => old.filter((name) => name != appName))
  }

  const doDelete = handlePromiseWithToast(async () => {
    setVisibleScrim(false)
    mutate({ appName })
    deleteAppNameFromLocalStorage(appName)
    navigate(routes.apps)
  }, 'Deleted')
  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Delete application</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <Typography>Once you delete an application there is no going back</Typography>
            <div>
              <Button color="danger" onClick={() => setVisibleScrim(true)}>
                Delete application
              </Button>
            </div>
          </div>
          <ScrimPopup
            title={
              <Typography variant="h5">
                Delete <strong>{appName}</strong>?
              </Typography>
            }
            open={visibleScrim}
            isDismissable
            onClose={() => setVisibleScrim(false)}
          >
            <div className="delete-app-content grid grid--gap-medium">
              <Alert className="icon" type="warning">
                <Icon data={warning_outlined} />
                <Typography>This action can not be undone.</Typography>
              </Alert>
              <Typography>
                You will permanently remove <strong>{appName}</strong> from Radix including all its environments.
              </Typography>
              <Typography>
                If you still want to delete this application and understand the consequences, type{' '}
                <strong>delete</strong> in the text field below.
              </Typography>
              <TextField
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <div>
                <Button color="danger" disabled={inputValue?.trim() !== 'delete'} onClick={doDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </ScrimPopup>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
