import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { InitialConfigurationPrompt } from '../../components/initial-configuration-prompt/InitialConfigurationPrompt'
import { PipelineJobsTable } from '../../components/pipeline-jobs-table/PipelineJobsTable'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobsQuery, useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import { PipelineJobsActions } from './components/PipelineJobsActions'

interface PipelineJobsPageProps {
  readonly appName: string
}

const PipelineJobsPage = (props: PipelineJobsPageProps) => {
  const { appName } = props

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
              <PipelineJobsActions appName={appName} />
            ) : (
              <InitialConfigurationPrompt application={application} />
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
