import { Icon, Typography } from '@equinor/eds-core-react'
import { time } from '@equinor/eds-icons'
import clsx from 'clsx'
import { Link } from 'react-router'
import { RadixJobSubPipelineStepConditionBadge } from '../../../../../components/status-badges/radix-job-subpipeline-step-condition-badge'
import { routes } from '../../../../../router/routes'
import type { Step } from '../../../../../store/radix-api'
import { routeWithParams } from '../../../../../utils/string'
import styles from '../pipelineJobStep.module.css'
import { getStepIcon } from '../pipelineJobStepList.utils'
import { PipelineJobStepDuration } from './PipelineJobStepDuration'

interface PipelineJobSubStepProps {
  readonly appName: string
  readonly jobName: string
  readonly step: Step
}

export const PipelineJobSubStep = (props: PipelineJobSubStepProps) => {
  const { appName, jobName, step } = props
  const sub = step.subPipelineTaskStep

  return (
    <div className={clsx(styles.indented, styles.step)}>
      <div className={clsx('grid', styles.divider)}>
        <Icon className={styles.stepIcon} data={getStepIcon(step.name ?? '')} />
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <Typography
            as={Link}
            to={routeWithParams(routes.appPipelineRunTaskStep, {
              appName,
              jobName,
              pipelineRunName: sub?.pipelineRunName ?? '',
              taskName: sub?.taskName ?? '',
              stepName: sub?.name ?? '',
            })}
            link
            token={{ textDecoration: 'none', textTransform: 'capitalize' }}
          >
            {sub?.taskName} / {sub?.name}
          </Typography>

          <RadixJobSubPipelineStepConditionBadge status={sub?.status ?? 'Waiting'} />
        </div>

        <div className={styles.time}>
          <Icon className={styles.icon} data={time} />
          <div className="grid grid--gap-small">
            <PipelineJobStepDuration started={step.started} ended={step.ended} />
          </div>
        </div>
      </div>
    </div>
  )
}
