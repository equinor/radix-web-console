import AsyncResource from '../../../components/async-resource/async-resource'
import { router } from '../../../router/router'
import { routes } from '../../../router/routes'
import { pollingInterval } from '../../../store/defaults'
import { radixApi, useGetApplicationJobQuery, useGetApplicationQuery } from '../../../store/radix-api'
import { routeWithParams } from '../../../utils/string'
import { PipelineJobDetailsContent } from './PipelineJobDetailsContent'

const JOB_POLLING_INTERVAL_MS = 8000

interface PipelineJobDetailsProps {
  readonly appName: string
  readonly jobName: string
}

export const PipelineJobDetails = (props: PipelineJobDetailsProps) => {
  const { appName, jobName } = props

  const { data: application } = useGetApplicationQuery({ appName }, { skip: !appName, pollingInterval })
  const {
    data: job,
    refetch: refetchJob,
    ...jobState
  } = useGetApplicationJobQuery(
    { appName, jobName },
    { skip: !appName || !jobName, pollingInterval: JOB_POLLING_INTERVAL_MS }
  )

  const [fetchAllJobs] = radixApi.endpoints.getApplicationJobs.useLazyQuery()

  const navigateToAllJobs = async () => {
    await fetchAllJobs({ appName }).unwrap()
    router.navigate(routeWithParams(routes.appJobs, { appName }))
  }

  const repository = application?.registration?.repository

  return (
    <main className="grid grid--gap-large">
      <AsyncResource asyncState={jobState}>
        <PipelineJobDetailsContent
          appName={appName}
          jobName={jobName}
          job={job}
          repository={repository}
          onJobChanged={refetchJob}
          onRerunJob={navigateToAllJobs}
        />
      </AsyncResource>
    </main>
  )
}
