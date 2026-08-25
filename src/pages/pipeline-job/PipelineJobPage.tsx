import { Breadcrumb } from '../../components/breadcrumb'
import { DocumentTitle } from '../../components/document-title'
import { routes } from '../../router/routes'
import { withRouteParams } from '../../utils/router'
import { routeWithParams, smallJobName } from '../../utils/string'
import { PipelineJobDetails } from './components/PipelineJobDetails'

interface PipelineJobPageProps {
  readonly appName: string
  readonly jobName: string
}

const PipelineJobPage = ({ appName, jobName }: PipelineJobPageProps) => {
  return (
    <>
      <DocumentTitle title={`Pipeline Job ${jobName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Pipeline Jobs', to: routeWithParams(routes.appJobs, { appName }) },
          { label: smallJobName(jobName) },
        ]}
      />
      <PipelineJobDetails appName={appName} jobName={jobName} />
    </>
  )
}
export default withRouteParams(PipelineJobPage)
