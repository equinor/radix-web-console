import { Typography } from '@equinor/eds-core-react'
import styles from '../environmentCard.module.css'

interface EnvironmentCardSectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
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
