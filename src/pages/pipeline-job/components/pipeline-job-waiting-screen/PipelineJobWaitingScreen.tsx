import { CircularProgress, Typography } from '@equinor/eds-core-react'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { routes } from '../../../../router/routes'
import type { Job } from '../../../../store/radix-api'
import { routeWithParams } from '../../../../utils/string'
import styles from './pipelineJobWaitingScreen.module.css'

interface PipelineJobWaitingScreenProps {
  readonly status: Job['status']
  readonly appName: string
  readonly jobType: Job['pipeline']
  readonly children?: ReactNode
}

export const PipelineJobWaitingScreen = (props: PipelineJobWaitingScreenProps) => {
  const { status, appName, jobType: pipelineType, children } = props

  const title = status === 'Waiting' ? 'Getting ready to start' : 'Pipeline job is queued'

  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <CircularProgress size={48} />
      </div>
      <Typography variant="h3" className={clsx(styles.title, styles.textCenter)}>
        {title}
      </Typography>
      <Typography variant="body_short" className={clsx(styles.textCenter, styles.subtitle)}>
        Job type: <b>{pipelineType}</b>
      </Typography>
      <Typography variant="body_short" className={styles.textCenter}>
        This pipeline job has not started yet. When the job starts, the page will automatically update to show the job
        details.
      </Typography>

      {children && <div className={styles.children}>{children}</div>}

      <Typography as={Link} link className={clsx(styles.link)} to={routeWithParams(routes.appJobs, { appName })}>
        Return to all pipeline jobs
      </Typography>
    </div>
  )
}
