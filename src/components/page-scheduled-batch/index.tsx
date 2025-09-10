import { routes } from '../../routes'
import { pollingInterval } from '../../store/defaults'
import { useGetBatchQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { getEnvsUrl } from '../../utils/routing'
import { routeWithParams, smallScheduledBatchName } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list'
import { ScheduledBatchOverview } from './scheduled-batch-overview'

import './style.css'

type Props = {
  appName: string
  envName: string
  jobComponentName: string
  scheduledBatchName: string
}
export function PageScheduledBatch({ appName, envName, jobComponentName, scheduledBatchName }: Props) {
  const { data: batch, ...scheduledBatchState } = useGetBatchQuery(
    { appName, envName, jobComponentName, batchName: scheduledBatchName },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledBatchName,
      pollingInterval: pollingInterval,
    }
  )

  return (
    <main className="grid grid--gap-medium">
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          {
            label: jobComponentName,
            to: routeWithParams(routes.appActiveJobComponent, {
              appName,
              envName,
              jobComponentName,
            }),
          },
          { label: `batch ${smallScheduledBatchName(scheduledBatchName)}` },
        ]}
      />

      <AsyncResource asyncState={scheduledBatchState}>
        {batch && <ScheduledBatchOverview appName={appName} batch={batch} jobComponentName={jobComponentName} />}
      </AsyncResource>

      {batch?.jobList && (
        <div className="grid grid--gap-medium">
          <ScheduledJobList
            appName={appName}
            envName={envName}
            jobComponentName={jobComponentName}
            scheduledJobList={batch.jobList}
            totalJobCount={batch.totalJobCount}
            isExpanded={true}
            batchName={batch.name}
          />
        </div>
      )}
    </main>
  )
}

export default withRouteParams(PageScheduledBatch)
