import { Icon } from '@equinor/eds-core-react'
import { language } from '@equinor/eds-icons'
import { ExternalLink } from '../../link/external-link'
import styles from '../environmentCard.module.css'
import type { PublicComponent } from '../environmentCard.types'

export const PublicComponentItem = (props: { component: PublicComponent }) => {
  const { component } = props

  return (
    <li className={styles.publicComponent}>
      <Icon size={18} data={language} className={styles.icon} />
      <ExternalLink href={component.url}>{component.name}</ExternalLink>
    </li>
  )
}
