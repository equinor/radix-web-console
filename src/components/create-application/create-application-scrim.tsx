import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useMsalAccountLocalStorage } from '../../hooks/use-local-storage'
import { routes } from '../../routes'
import type { ApplicationRegistration, DeployKeyAndSecret } from '../../store/radix-api'
import { routeWithParams } from '../../utils/string'
import { ConfigureDeployKey } from '../configure-application-github/configure-deploy-key'
import { ConfigureGitHubWebhook } from '../configure-application-github/configure-git-hub-webhook'
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link'
import { ScrimPopup } from '../scrim-popup'
import { CreateApplicationForm } from './create-application-form'

type Props = {
  secrets?: DeployKeyAndSecret
  onRefreshApps: () => unknown
  onCreateApplication: (application: ApplicationRegistration, acknowledgeWarnings: boolean) => Promise<string[]>
}

export function CreateApplicationScrim({ secrets, onRefreshApps, onCreateApplication }: Props) {
  const [visibleScrim, setVisibleScrim] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [registration, setRegistration] = useState<ApplicationRegistration>()
  const [page, setNewPage] = useCurrentPage()

  const onCloseScrim = () => {
    setVisibleScrim(false)
    setRegistration(undefined)
  }

  const [knownAppNames, setKnownAppNames] = useMsalAccountLocalStorage<Array<string>>('knownApplications', [])

  const addAppNameToLocalStorage = (appName: string) => {
    if (knownAppNames.some((knownAppName) => knownAppName === appName)) {
      return
    }
    setKnownAppNames([...knownAppNames, appName].sort())
  }

  const onLocalCreateApplication = async (newRegistration: ApplicationRegistration, acknowledgeWarnings: boolean) => {
    const warnings = await onCreateApplication(newRegistration, acknowledgeWarnings)
    if (warnings.length > 0) {
      return warnings
    }
    addAppNameToLocalStorage(newRegistration.name)
    containerRef.current?.scrollTo(0, 0)
    setRegistration(newRegistration)
    onRefreshApps()
    setNewPage('deploykey')
    return []
  }

  return (
    <>
      <Button className="action--justify-end" variant="ghost" color="primary" onClick={() => setVisibleScrim(true)}>
        <Icon data={add} />
        Create new app
      </Button>
      <ScrimPopup title="Create new app" open={visibleScrim} onClose={onCloseScrim}>
        <div ref={containerRef}>
          {(page === 'registration' || !registration) && (
            <CreateApplicationForm
              onNext={() => setNewPage('deploykey')}
              registration={registration}
              onCreate={onLocalCreateApplication}
            />
          )}

          {page === 'deploykey' && registration && (
            <div className={'create-app'}>
              <div className="create-app-content">
                <Typography>
                  The application <strong>{registration.name}</strong> has been set up
                </Typography>
                <Typography>To integrate with GitHub you must add a deploy key and a webhook</Typography>
                <ConfigureDeployKey deployKey={secrets} app={registration} />
              </div>
              <div className="create-app-footer">
                <Button onClick={() => setNewPage('registration')} variant={'ghost'}>
                  Previous: Registration
                </Button>
                <Button onClick={() => setNewPage('webhook')}>Next: Configure Webhook</Button>
              </div>
            </div>
          )}

          {page === 'webhook' && registration && (
            <div className={'create-app'}>
              <div className="create-app-content">
                <ConfigureGitHubWebhook
                  appName={registration.name}
                  repository={registration.repository}
                  sharedSecret={secrets?.sharedSecret}
                />
              </div>
              <div className="create-app-footer">
                <Button onClick={() => setNewPage('deploykey')} variant={'ghost'}>
                  Previous: Deploykey
                </Button>
                <Button onClick={() => setNewPage('finished')}>Complete</Button>
              </div>
            </div>
          )}

          {page === 'finished' && registration && (
            <div className={'create-app'}>
              <div className="create-app-content">
                <Typography>
                  Now you can run the <em>apply-config</em> pipeline job, or go to{' '}
                  <Typography
                    as={Link}
                    to={routeWithParams(routes.app, {
                      appName: registration.name,
                    })}
                    link
                  >
                    your application's page
                  </Typography>
                </Typography>
              </div>
              <div className="create-app-footer">
                <Button onClick={() => setNewPage('webhook')} variant={'ghost'}>
                  Previous: Webhook
                </Button>
                <NewApplyConfigPipelineLink button appName={registration.name}>
                  Apply Config
                </NewApplyConfigPipelineLink>
              </div>
            </div>
          )}
        </div>
      </ScrimPopup>
    </>
  )
}

type Page = 'registration' | 'deploykey' | 'webhook' | 'finished'
function useCurrentPage(): [Page, (newPage: Page) => unknown] {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? 'registration'

  const onNewPage = (newPage: Page) => {
    setSearchParams((prev) => {
      prev.set('page', newPage)
      return prev
    })
  }

  return [page as Page, onNewPage]
}
