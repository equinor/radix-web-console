import { Button, Icon } from '@equinor/eds-core-react'
import { add } from '@equinor/eds-icons'
import { Link } from 'react-router'
import { routes } from '../../../router/routes'
import { routeWithParams } from '../../../utils/string'
import styles from '../pipelineJobsPage.module.css'
import { ApplicationAlerting } from './ApplicationAlerting'

interface PipelineJobsActionsProps {
  readonly appName: string
}

export const PipelineJobsActions = (props: PipelineJobsActionsProps) => {
  const { appName } = props

  return (
    <div className={styles.actions}>
      <div>
        <Button variant="ghost" as={Link} to={routeWithParams(routes.appJobNew, { appName })}>
          <Icon data={add} size={24} />
          Create new
        </Button>
      </div>
      <div className={styles.alerting}>
        <ApplicationAlerting appName={appName} />
      </div>
    </div>
  )
}
