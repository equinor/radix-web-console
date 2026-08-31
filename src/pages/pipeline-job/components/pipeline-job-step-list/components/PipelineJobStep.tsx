import { Icon, Typography } from '@equinor/eds-core-react'
import { time } from '@equinor/eds-icons'
import clsx from 'clsx'
import { Link } from 'react-router'
import { RadixJobConditionBadge } from '../../../../../components/status-badges'
import { routes } from '../../../../../router/routes'
import type { Step } from '../../../../../store/radix-api'
import { routeWithParams } from '../../../../../utils/string'
import styles from '../pipelineJobStep.module.css'
import { getStepIcon } from '../pipelineJobStepList.utils'
import { PipelineJobStepDescription } from './PipelineJobStepDescription'
import { PipelineJobStepDuration } from './PipelineJobStepDuration'

interface PipelineJobStepProps {
  readonly appName: string
  readonly jobName: string
  readonly step: Step
}

export const PipelineJobStep = (props: PipelineJobStepProps) => {
  const { appName, jobName, step } = props

  return (
    <div className={styles.step}>
      <div className={clsx('grid', styles.divider)}>
        <Icon className={styles.stepIcon} data={getStepIcon(step.name ?? '')} />
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <Typography
            as={Link}
            to={routeWithParams(routes.appJobStep, { appName, jobName, stepName: step.name ?? '' })}
            link
            token={{ textDecoration: 'none', textTransform: 'capitalize' }}
          >
            <PipelineJobStepDescription name={step.name} components={step.components} />
          </Typography>

          <RadixJobConditionBadge status={step.status ?? 'Waiting'} />
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
