import { withRouteParams } from '../../utils/router'
import { DocumentTitle } from '../document-title'
import { JobOverview } from '../job-overview'

type Props = {
  appName: string
  jobName: string
}
export function PipelinePageJob({ appName, jobName }: Props) {
  return (
    <>
      <DocumentTitle title={`Pipeline Job ${jobName}`} />
      <JobOverview appName={appName} jobName={jobName} />
    </>
  )
}
export default withRouteParams(PipelinePageJob)
