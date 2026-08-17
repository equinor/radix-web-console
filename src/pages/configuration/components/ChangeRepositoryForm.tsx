import { Accordion, Button, Checkbox, CircularProgress, List, TextField, Typography } from '@equinor/eds-core-react'
import { type ChangeEvent, type SubmitEventHandler, useState } from 'react'
import { Banner } from '../../../components/banner/Banner'
import { handlePromiseWithToast } from '../../../components/global-top-nav/styled-toaster'
import { ExternalLink } from '../../../components/link/external-link'
import { useModifyRegistrationDetailsMutation } from '../../../store/radix-api'
import { getFetchErrorMessage } from '../../../store/utils/parse-errors'

interface Props {
  appName: string
  repository: string
  refetch: () => unknown
}
export function ChangeRepositoryForm({ appName, repository, refetch }: Props) {
  const [currentRepository, setCurrentRepository] = useState(repository)
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false)
  const [mutate, { isLoading, error, data: modifyState, isSuccess }] = useModifyRegistrationDetailsMutation()

  const handleSubmit: SubmitEventHandler = handlePromiseWithToast(async (ev) => {
    ev.preventDefault()

    await mutate({
      appName,
      applicationRegistrationPatchRequest: {
        applicationRegistrationPatch: {
          repository: currentRepository,
        },
        acknowledgeWarnings: useAcknowledgeWarnings,
      },
    }).unwrap()

    await refetch?.()
  })

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change GitHub repository</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {error && (
                <div>
                  <Banner variant="danger">
                    <Banner.Message>Failed to change repository. {getFetchErrorMessage(error)}</Banner.Message>
                  </Banner>
                </div>
              )}
              <TextField
                disabled={isLoading}
                type="url"
                value={currentRepository ?? repository ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentRepository(e.target.value)}
                label="URL"
                helperText="e.g. 'https://github.com/equinor/my-app'"
              />
              {isLoading && (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              )}
              {!isLoading && modifyState?.warnings && (
                <div className="grid grid--gap-medium">
                  <List>
                    {modifyState?.warnings.map((warning, i) => (
                      <List.Item key={i}>
                        <Banner variant="warning">
                          <Banner.Message>{warning}</Banner.Message>
                        </Banner>
                      </List.Item>
                    ))}
                  </List>
                  <Checkbox
                    label="Proceed with warnings"
                    name="acknowledgeWarnings"
                    checked={useAcknowledgeWarnings}
                    onChange={() => setAcknowledgeWarnings(!useAcknowledgeWarnings)}
                  />
                </div>
              )}
              {!isLoading && (
                <div>
                  <Button
                    color="danger"
                    type="submit"
                    disabled={
                      currentRepository === repository ||
                      currentRepository.length < 5 ||
                      (modifyState?.warnings && !useAcknowledgeWarnings)
                    }
                  >
                    Change repository
                  </Button>
                </div>
              )}
            </form>
            {!isLoading && isSuccess && (
              <Banner variant="success">
                <Banner.Message>
                  Repository updated. Remember to update your{' '}
                  <ExternalLink href="https://radix.equinor.com/start/registering-app/#deploy-key">
                    deploy key
                  </ExternalLink>{' '}
                  and your webhooks shared secret if you use it.
                </Banner.Message>
              </Banner>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
