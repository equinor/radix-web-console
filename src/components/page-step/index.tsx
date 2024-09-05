import { Typography } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'
import {
  getPipelineStepDescription,
  getPipelineStepTitle,
} from '../../utils/pipeline'
import { routeWithParams, smallJobName } from '../../utils/string'

import { JobStepLogs } from './job-step-logs'

import { routes } from '../../routes'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { getJobExecutionState } from '../component/execution-state'
import { DocumentTitle } from '../document-title'
import { PipelineRuns } from '../pipeline-runs'
import { Duration } from '../time/duration'
import { RelativeToNow } from '../time/relative-to-now'

import './style.css'
import { pollingInterval } from '../../store/defaults'
import {
  useGetApplicationJobQuery,
  useGetTektonPipelineRunsQuery,
} from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { DurationToNow } from '../time/duration-to-now'

export interface PageStepProps {
  appName: string
  jobName: string
  stepName: string
}

export function PageStep({ appName, jobName, stepName }: PageStepProps) {
  const { data: job } = useGetApplicationJobQuery(
    { appName, jobName },
    { pollingInterval }
  )
  const { data: pipelineRuns, ...pipelineRunsState } =
    useGetTektonPipelineRunsQuery(
      {
        appName,
        jobName,
      },
      { pollingInterval }
    )
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
                  Pipeline Step <strong>
                    {step.status.toLowerCase()}
                  </strong>{' '}
                </Typography>
                <Typography>
                  {getJobExecutionState(step.status)} Step{' '}
                  <strong>
                    {getPipelineStepTitle(step.name) || step.name}
                  </strong>
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

          {stepName === 'run-pipelines' &&
            (pipelineRuns?.length > 0 ? (
              <section>
                <Typography
                  variant="h4"
                  className={`pipeline-run-header-absolute'`}
                >
                  Environment pipelines
                </Typography>
                <AsyncResource asyncState={pipelineRunsState}>
                  <PipelineRuns
                    pipelineRuns={pipelineRuns}
                    jobName={jobName}
                    appName={appName}
                  />
                </AsyncResource>
              </section>
            ) : (
              <Typography
                variant="h4"
                className={`pipeline-run-header-absolute'`}
              >
                No environment pipelines
              </Typography>
            ))}

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
PageStep.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
}

export default withRouteParams(PageStep)
