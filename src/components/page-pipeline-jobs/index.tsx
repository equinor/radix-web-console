import { Button, Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobsQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DocumentTitle } from '../document-title'
import { JobsList } from '../jobs-list'
import ApplicationAlerting from './application-alerting'

import './style.css'

export function PipelinePageJobs({ appName }: { appName: string }) {
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
export default withRouteParams(PipelinePageJobs)
