import { Icon, Typography } from '@equinor/eds-core-react'
import { language } from '@equinor/eds-icons'
import { ExternalLink } from '../../link/external-link'
import styles from '../environmentCard.module.css'
import type { EnvironmentCardPublicComponents, PublicComponent } from '../environmentCard.types'

const PublicComponentItem = (props: { component: PublicComponent }) => {
  const { component } = props

  return (
    <li className={styles.publicComponent}>
      <Icon size={18} data={language} className={styles.icon} />
      <ExternalLink href={component.url}>{component.name}</ExternalLink>
    </li>
  )
}

export const PublicComponentsList = (props: { publicComponents: EnvironmentCardPublicComponents }) => {
  const { publicComponents } = props

  if (publicComponents.visible.length === 0) {
    return <Typography color="disabled">No public components available</Typography>
  }

  return (
    <ul>
      {publicComponents.visible.map((component) => (
        <PublicComponentItem key={component.name} component={component} />
      ))}
    </ul>
  )
}
