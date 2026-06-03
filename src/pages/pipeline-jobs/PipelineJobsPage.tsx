import { Button, Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { Link } from 'react-router'
import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { JobsList } from '../../components/jobs-list'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobsQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import ApplicationAlerting from './components/ApplicationAlerting'

import './style.css'

export function PipelineJobsPage({ appName }: { appName: string }) {
  const { data: jobs, ...state } = useGetApplicationJobsQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} pipeline jobs`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Pipeline Jobs' }]}
      />

      <main className="grid grid--gap-medium">
        <div className="pipeline-job-actions">
          <div>
            <Button variant="ghost" as={Link} to={routeWithParams(routes.appJobNew, { appName })}>
              <Icon data={add} size={24} />
              Create new
            </Button>
          </div>
          <div className="pipeline-job-action__action--justify-end">
            <ApplicationAlerting appName={appName} />
          </div>
        </div>

        <AsyncResource asyncState={state}>
          <JobsList appName={appName} jobs={jobs} />
        </AsyncResource>
      </main>
    </>
  )
}
export default withRouteParams(PipelineJobsPage)
