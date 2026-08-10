import { Typography } from '@equinor/eds-core-react'
import { EnvironmentCardContainer } from '../../containers/environment-card-container/EnvironmentCardContainer'
import type { Application } from '../../store/radix-api'
import { Banner } from '../banner/Banner'
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link'
import { RadixConfigFileLink } from '../link/radix-config-file-link'

export type EnvironmentListProps = {
  readonly application: Pick<Application, 'name' | 'registration' | 'environments'>
}

export const EnvironmentCardList = ({ application }: EnvironmentListProps) => {
  const hasEnvironments = application.environments && application.environments.length > 0

  return (
    <>
      {hasEnvironments ? (
        <ul className="grid grid--gap-medium grid--overview-columns">
          {application?.environments?.map((environment) => (
            <li key={environment.name}>
              <EnvironmentCardContainer application={application} environment={environment} />
            </li>
          ))}
        </ul>
      ) : (
        <Banner>
          <Banner.Message>
            <Typography>
              The <RadixConfigFileLink registration={application.registration} /> file must be read by Radix in order to
              show information about environments.
            </Typography>
            <Typography>
              Run the <NewApplyConfigPipelineLink appName={application.name}>apply-config</NewApplyConfigPipelineLink>{' '}
              pipeline job to read the file from the application's GitHub repository.
            </Typography>
          </Banner.Message>
        </Banner>
      )}
    </>
  )
}
