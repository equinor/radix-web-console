import { Icon, Typography } from '@equinor/eds-core-react'
import { time } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import { RadixJobSubPipelineStepConditionBadge } from '../../../../components/status-badges/radix-job-subpipeline-step-condition-badge'
import { RelativeToNow } from '../../../../components/time/relative-to-now'
import { routes } from '../../../../router/routes'
import type { Step } from '../../../../store/radix-api'
import { differenceInWords, formatDateTimePrecise } from '../../../../utils/datetime'
import { routeWithParams } from '../../../../utils/string'
import styles from './stepSummary.module.css'

const SubPipelineStepDuration: FunctionComponent<Pick<Step, 'started' | 'ended'>> = ({ ended, started }) =>
  started ? (
    <>
      <RelativeToNow time={new Date(started)} titlePrefix="Start time" capitalize />
      {ended && (
        <span title={`End time ${formatDateTimePrecise(new Date(ended))}`}>
          {differenceInWords(new Date(ended), new Date(started))}
        </span>
      )}
    </>
  ) : (
    <>Not yet started</>
  )

export const SubPipelineStepSummary: FunctionComponent<{
  appName: string
  jobName: string
  step: Step
}> = ({ appName, jobName, step }) => (
  <div className={styles.content}>
    <div className={styles.description}>
      <Typography
        as={Link}
        to={routeWithParams(routes.appPipelineRunTaskStep, {
          appName: appName,
          jobName: jobName,
          pipelineRunName: step.subPipelineTaskStep?.pipelineRunName ?? '',
          taskName: step.subPipelineTaskStep?.taskName ?? '',
          stepName: step.subPipelineTaskStep?.name ?? '',
        })}
        link
        token={{ textDecoration: 'none', textTransform: 'capitalize' }}
      >
        {step.subPipelineTaskStep?.taskName} / {step.subPipelineTaskStep?.name}
      </Typography>

      <RadixJobSubPipelineStepConditionBadge status={step.subPipelineTaskStep?.status ?? 'Waiting'} />
    </div>

    <div className={styles.time}>
      <Icon className={styles.icon} data={time} />
      <div className="grid grid--gap-small">
        <SubPipelineStepDuration started={step.started} ended={step.ended} />
      </div>
    </div>
  </div>
)
