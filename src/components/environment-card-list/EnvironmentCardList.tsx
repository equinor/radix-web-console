import { EnvironmentCardContainer } from '../../containers/environment-card-container/EnvironmentCardContainer'
import type { Application } from '../../store/radix-api'
import styles from './environmentCardList.module.css'

interface EnvironmentCardListProps {
  readonly application: Pick<Application, 'name' | 'registration' | 'environments'>
}

export const EnvironmentCardList = (props: EnvironmentCardListProps) => {
  const { application } = props
  const hasEnvironments = (application.environments?.length ?? 0) > 0

  if (!hasEnvironments) return null

  return (
    <ul className={styles.environmentCardList}>
      {application?.environments?.map((environment) => (
        <li key={environment.name}>
          <EnvironmentCardContainer application={application} environment={environment} />
        </li>
      ))}
    </ul>
  )
}
