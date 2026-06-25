import { Typography } from '@equinor/eds-core-react'
import { Breadcrumb } from '../../components/breadcrumb'
import { getJobExecutionState } from '../../components/component/execution-state'
import { DocumentTitle } from '../../components/document-title'
import { Duration } from '../../components/time/duration'
import { DurationToNow } from '../../components/time/duration-to-now'
import { RelativeToNow } from '../../components/time/relative-to-now'
import { routes } from '../../router/routes'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationJobQuery } from '../../store/radix-api'
import { getPipelineStepDescription, getPipelineStepTitle } from '../../utils/pipeline'
import { withRouteParams } from '../../utils/router'
import { routeWithParams, smallJobName } from '../../utils/string'

import './style.css'
import { JobStepLogs } from './components/JobStepLogs'

export interface PageStepProps {
  appName: string
  jobName: string
  stepName: string
}

export function StepPage({ appName, jobName, stepName }: PageStepProps) {
  const { data: job } = useGetApplicationJobQuery({ appName, jobName }, { pollingInterval })
  const step = job?.steps?.find((step) => step.name === stepName)

  return (
    <>
      <DocumentTitle title={stepName} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Pipeline Jobs',
            to: routeWithParams(routes.appJobs, { appName }),
          },
          {
            label: smallJobName(jobName),
            to: routeWithParams(routes.appJob, { appName, jobName }),
          },
          { label: getPipelineStepDescription(stepName) || stepName },
        ]}
      />

      {!step ? (
        <Typography>No step…</Typography>
      ) : (
        <>
          <section className="grid grid--gap-medium">
            <Typography variant="h4">Overview</Typography>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <Typography>
                  Pipeline Step <strong>{step.status?.toLowerCase() ?? 'pending'}</strong>{' '}
                </Typography>
                <Typography>
                  {getJobExecutionState(step.status)} Step{' '}
                  <strong>{getPipelineStepTitle(step.name) || step.name}</strong>
                </Typography>
                {step.components?.length == 1 && (
                  <Typography>
                    {'Component'} <strong>{step.components[0]}</strong>
                  </Typography>
                )}
              </div>
              {step.started && (
                <div className="grid grid--gap-medium">
                  <Typography>
                    Started{' '}
                    <strong>
                      <RelativeToNow time={step.started} />
                    </strong>
                  </Typography>
                  {step.ended ? (
                    <Typography>
                      Step took{' '}
                      <strong>
                        <Duration start={step.started} end={step.ended} />
                      </strong>
                    </Typography>
                  ) : (
                    <Typography>
                      Duration so far is{' '}
                      <strong>
                        <DurationToNow start={step.started} />
                      </strong>
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </section>
          <section>
            <JobStepLogs
              appName={appName}
              jobName={jobName}
              stepName={stepName}
              start={step?.started}
              end={step?.ended}
            />
          </section>
        </>
      )}
    </>
  )
}
export default withRouteParams(StepPage)
