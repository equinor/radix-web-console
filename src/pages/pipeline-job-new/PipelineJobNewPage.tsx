import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { Alert } from '../../components/alert'
import { Breadcrumb } from '../../components/breadcrumb'
import CreateJobForm from '../../components/create-job-form'
import { DocumentTitle } from '../../components/document-title'
import { routes } from '../../router/routes'
import { radixApi } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

function JobLink(props: { appName: string; jobName: string }) {
  return (
    <Typography as={Link} to={routeWithParams(routes.appJob, props)} link>
      Pipeline Job
    </Typography>
  )
}
function JobsLink(props: { appName: string }) {
  return (
    <Typography as={Link} to={routeWithParams(routes.appJobs, props)} link>
      Pipeline Jobs
    </Typography>
  )
}

interface Props {
  appName: string
}
function PipelineJobNewPage({ appName }: Props) {
  const [createdJob, setCreatedJob] = useState<string>()
  const dispatch = useDispatch()

  const onSuccess = (jobName: string) => {
    setCreatedJob(jobName)

    // Force refetch list of jobs
    dispatch(
      // @ts-expect-error initiate *is* a action, wrong types from redux?
      radixApi.endpoints.getApplicationJobs.initiate({ appName }, { subscribe: false, forceRefetch: true })
    )
  }

  return (
    <>
      <DocumentTitle title="New pipeline job" />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Pipeline Jobs',
            to: routeWithParams(routes.appJobs, { appName }),
          },
          { label: 'New pipeline job' },
        ]}
      />
      <div className="grid grid--gap-medium">
        <div className="grid grid--gap-small">
          <Typography variant="h4">New pipeline job</Typography>
          <Typography>
            Pipeline jobs perform different actions in Radix. The pipeline of the job defines what action to take, and
            it may require specific parameters.
          </Typography>
        </div>
        {createdJob ? (
          <div className="grid grid--gap-medium">
            <Alert>
              <Typography>The pipeline job "{createdJob}" has been created</Typography>
            </Alert>
            <Typography>
              View <JobLink jobName={createdJob} appName={appName} /> or all <JobsLink appName={appName} />
            </Typography>
          </div>
        ) : (
          <CreateJobForm appName={appName} onSuccess={onSuccess} />
        )}
      </div>
    </>
  )
}
export default withRouteParams(PipelineJobNewPage)
