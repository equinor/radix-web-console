import { Button, Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { Link } from 'react-router'
import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { FirstTimeApplyConfig } from '../../components/first-time-apply-config/FirstTimeApplyConfig'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobsQuery, useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import ApplicationAlerting from './components/ApplicationAlerting'

import './style.css'
import { PipelineJobsTable } from '../../components/pipeline-jobs-table/PipelineJobsTable'

function PipelineJobsPage({ appName }: { appName: string }) {
  const { data: application, ...applicationState } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  )
  const { data: jobs, ...jobsState } = useGetApplicationJobsQuery({ appName }, { skip: !appName, pollingInterval })

  return (
    <>
      <DocumentTitle title={`${appName} pipeline jobs`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Pipeline Jobs' }]}
      />

      <main className="grid grid--gap-medium">
        <AsyncResource asyncState={applicationState}>
          {application &&
            (hasAppliedRadixConfig(application) ? (
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
            ) : (
              <FirstTimeApplyConfig application={application} />
            ))}
        </AsyncResource>

        <AsyncResource asyncState={jobsState}>
          <PipelineJobsTable appName={appName} jobs={jobs} />
        </AsyncResource>
      </main>
    </>
  )
}
export default withRouteParams(PipelineJobsPage)
