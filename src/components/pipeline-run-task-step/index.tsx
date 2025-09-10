import { Typography } from '@equinor/eds-core-react'
import { routes } from '../../routes'
import { useGetTektonPipelineRunTaskStepQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'
import { routeWithParams, smallJobName } from '../../utils/string'
import AsyncResource from '../async-resource/async-resource'
import { Breadcrumb } from '../breadcrumb'
import { DocumentTitle } from '../document-title'
import { PipelineRunTaskStepLog } from '../pipeline-run-task-step-log'
import { PipelineRunTaskStepOverview } from './step-overview'

export interface Props {
  appName: string
  jobName: string
  pipelineRunName: string
  taskName: string
  stepName: string
}

export function PipelineRunTaskStep({ appName, jobName, pipelineRunName, taskName, stepName }: Props) {
  const { data: taskStep, ...stepState } = useGetTektonPipelineRunTaskStepQuery(
    { appName, jobName, pipelineRunName, taskName, stepName },
    {
      skip: !appName || !jobName || !pipelineRunName || !taskName || !stepName,
      pollingInterval: 5000,
    }
  )

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
        ]}
      />

      {!taskStep?.subPipelineTaskStep ? (
        <Typography>No step…</Typography>
      ) : (
        <>
          <section className="grid grid--gap-medium">
            <PipelineRunTaskStepOverview taskStep={taskStep} />
          </section>
          <section>
            <AsyncResource asyncState={stepState}>
              <PipelineRunTaskStepLog
                appName={appName}
                jobName={jobName}
                pipelineRunName={taskStep.subPipelineTaskStep.pipelineRunName}
                taskName={taskStep.subPipelineTaskStep.kubeName}
                stepName={taskStep.subPipelineTaskStep.name}
                title={'Log'}
              />
            </AsyncResource>
          </section>
        </>
      )}
    </>
  )
}

export default withRouteParams(PipelineRunTaskStep)
