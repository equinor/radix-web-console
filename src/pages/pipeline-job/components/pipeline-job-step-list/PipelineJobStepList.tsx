import { Icon, Typography } from '@equinor/eds-core-react'
import { lightbulb } from '@equinor/eds-icons'
import clsx from 'clsx'
import { Fragment } from 'react'
import type { Step } from '../../../../store/radix-api'
import { PipelineJobStep } from './components/PipelineJobStep'
import { PipelineJobSubStep } from './components/PipelineJobSubStep'
import styles from './pipelineJobStep.module.css'
import { getNamedSteps, getStepKey, getSubPipelineSteps } from './pipelineJobStepList.utils'

interface PipelineJobStepListProps {
  readonly appName: string
  readonly jobName: string
  readonly steps?: ReadonlyArray<Step>
}

export const PipelineJobStepList = (props: PipelineJobStepListProps) => {
  const { appName, jobName, steps } = props
  const namedSteps = getNamedSteps(steps ?? [])
  const subPipelineSteps = getSubPipelineSteps(steps ?? [])

  return (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="grid grid--gap-medium">
        {namedSteps.length > 0 ? (
          namedSteps.map((step) => (
            <PipelineJobStep key={getStepKey(step)} appName={appName} jobName={jobName} step={step} />
          ))
        ) : (
          <Typography>This job has no steps</Typography>
        )}
        {subPipelineSteps.map((groupedSteps) => (
          <Fragment key={`${groupedSteps.pipelineName}-${groupedSteps.environment}`}>
            <div className={styles.step}>
              <div className={clsx('grid', styles.divider)}>
                <Icon className={styles.stepIcon} data={lightbulb} />
              </div>
              <Typography>Sub-Pipeline / {groupedSteps.environment}</Typography>
            </div>
            {groupedSteps.steps.map((step) => (
              <PipelineJobSubStep key={getStepKey(step)} appName={appName} jobName={jobName} step={step} />
            ))}
          </Fragment>
        ))}
      </div>
    </>
  )
}
