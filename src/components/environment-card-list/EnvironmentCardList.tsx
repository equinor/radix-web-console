import { EnvironmentCardContainer } from '../../containers/environment-card-container/EnvironmentCardContainer'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import type { Application } from '../../store/radix-api'
import { MissingRadixConfigAlert } from '../create-job-form/missing-radix-config-alert'
import styles from './environmentCardList.module.css'

interface EnvironmentCardListProps {
  readonly application: Pick<Application, 'name' | 'registration' | 'environments'>
}

export const EnvironmentCardList = (props: EnvironmentCardListProps) => {
  const { application } = props
  const isRadixConfigApplied = hasAppliedRadixConfig(application)

  return (
    <>
      {isRadixConfigApplied ? (
        <ul className={styles.environmentCardList}>
          {application?.environments?.map((environment) => (
            <li key={environment.name}>
              <EnvironmentCardContainer application={application} environment={environment} />
            </li>
          ))}
        </ul>
      ) : (
        <MissingRadixConfigAlert application={application} />
      )}
    </>
  )
}
