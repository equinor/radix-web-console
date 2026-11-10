import { ApplyConfigPromptBanner } from '../../components/apply-config-prompt/components/banner/ApplyConfigPromptBanner'
import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { PipelineJobsTable } from '../../components/pipeline-jobs-table/PipelineJobsTable'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobsQuery, useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'
import { PipelineJobsActions } from './components/PipelineJobsActions'

const CONFIG_NOT_APPLIED_NO_JOBS_GUIDANCE_TEXT = 'Your first pipeline job will show up here once you apply your config'

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

  const hasAppliedConfig = application ? hasAppliedRadixConfig(application) : undefined
  const noJobsGuidanceText = hasAppliedConfig === false ? CONFIG_NOT_APPLIED_NO_JOBS_GUIDANCE_TEXT : undefined

  return (
    <>
      <DocumentTitle title={`${appName} pipeline jobs`} />
      <Breadcrumb
        links={[{ label: appName, to: routeWithParams(routes.app, { appName }) }, { label: 'Pipeline Jobs' }]}
      />

      <main className="grid grid--gap-medium">
        <AsyncResource asyncState={applicationState}>
          {application &&
            (hasAppliedConfig ? (
              <PipelineJobsActions appName={appName} />
            ) : (
              <ApplyConfigPromptBanner application={application} />
            ))}
        </AsyncResource>

        <AsyncResource asyncState={jobsState}>
          <PipelineJobsTable appName={appName} jobs={jobs} noJobsGuidanceText={noJobsGuidanceText} />
        </AsyncResource>
      </main>
    </>
  )
}

export default withRouteParams(PipelineJobsPage)
