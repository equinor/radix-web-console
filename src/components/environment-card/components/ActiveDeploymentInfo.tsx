import { Icon, Typography } from '@equinor/eds-core-react'
import { send } from '@equinor/eds-icons'
import { Link } from 'react-router'
import { smallDeploymentName } from '../../../utils/string'
import { RelativeToNow } from '../../time/relative-to-now'
import styles from '../environmentCard.module.css'
import type { EnvironmentCardActiveDeployment } from '../environmentCard.types'

export const ActiveDeploymentInfo = (props: { deployment?: EnvironmentCardActiveDeployment }) => {
  const { deployment } = props

  if (!deployment) {
    return <Typography color="disabled">No active deployment</Typography>
  }

  return (
    <>
      <Icon size={18} data={send} className={styles.icon} />
      <Typography as={Link} to={deployment.url} link>
        {smallDeploymentName(deployment.name)}
      </Typography>{' '}
      <span className={styles.secondaryText}>
        (<RelativeToNow time={deployment.activeFrom} titlePrefix="Deployed" capitalize />)
      </span>
    </>
  )
}
