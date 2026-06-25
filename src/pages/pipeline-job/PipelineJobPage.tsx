import { DocumentTitle } from '../../components/document-title'
import { JobOverview } from '../../components/job-overview'
import { withRouteParams } from '../../utils/router'

type Props = {
  appName: string
  jobName: string
}
function PipelineJobPage({ appName, jobName }: Props) {
  return (
    <>
      <DocumentTitle title={`Pipeline Job ${jobName}`} />
      <JobOverview appName={appName} jobName={jobName} />
    </>
  )
}
export default withRouteParams(PipelineJobPage)
