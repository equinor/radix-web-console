import { Typography } from '@equinor/eds-core-react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import AsyncResource from '../../components/async-resource/async-resource'
import { Breadcrumb } from '../../components/breadcrumb'
import { CreateJobForm } from '../../components/create-job-form'
import { DocumentTitle } from '../../components/document-title'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { radixApi, useGetApplicationQuery } from '../../store/radix-api'
import type { AppDispatch } from '../../store/store'
import { withRouteParams } from '../../utils/router'
import { routeWithParams } from '../../utils/string'

interface PipelineJobNewPageProps {
  readonly appName: string
}

function PipelineJobNewPage({ appName }: PipelineJobNewPageProps) {
  const { data: application, ...appState } = useGetApplicationQuery({ appName }, { pollingInterval })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const refreshAndNavigateToJob = async (jobName: string) => {
    // Force refetch list of jobs
    await dispatch(
      radixApi.endpoints.getApplicationJobs.initiate({ appName }, { subscribe: false, forceRefetch: true })
    )
    await navigate(routeWithParams(routes.appJob, { appName, jobName }))
  }

  /** This page should not be accessible if the Radix config is not applied. Only decide once the application has loaded. */
  if (application && !hasAppliedRadixConfig(application)) {
    return <Navigate to={routeWithParams(routes.appJobs, { appName })} replace />
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
      <AsyncResource asyncState={appState}>
        {application && (
          <div className="grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="h4">New pipeline job</Typography>
              <Typography>
                Pipeline jobs perform different actions in Radix. The pipeline of the job defines what action to take,
                and it may require specific parameters.
              </Typography>
            </div>
            <CreateJobForm onSuccess={refreshAndNavigateToJob} application={application} />
          </div>
        )}
      </AsyncResource>
    </>
  )
}

export default withRouteParams(PipelineJobNewPage)
