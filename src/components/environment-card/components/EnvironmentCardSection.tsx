import { Typography } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'
import styles from '../environmentCard.module.css'

interface EnvironmentCardSectionProps {
  readonly title: string
  readonly subtitle?: string
  readonly children: ReactNode
}

export const EnvironmentCardSection = ({ title, subtitle, children }: EnvironmentCardSectionProps) => (
  <div>
    <div>
      <Typography variant="caption" as="span">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" as="span" className={styles.secondaryText}>
          {' '}
          {subtitle}
        </Typography>
      )}
    </div>
    {children}
  </div>
)
