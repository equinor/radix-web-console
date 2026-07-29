import { Typography } from '@equinor/eds-core-react'
import type { Application } from '../../store/radix-api'
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link'
import './style.css'
import { Banner } from '../banner/Banner'
import { EnvironmentCardContainer } from '../environment-card/EnvironmentCardContainer'
import { RadixConfigFileLink } from '../link/radix-config-file-link'

export type EnvironmentsSummaryProps = {
  application: Application
}

export const EnvironmentsSummary = ({ application }: EnvironmentsSummaryProps) => {
  const hasEnvironments = application.environments && application.environments.length > 0

  return (
    <>
      {hasEnvironments ? (
        <div className="grid grid--gap-medium grid--overview-columns">
          {application?.environments?.map((environment) => (
            <EnvironmentCardContainer key={environment.name} application={application} environment={environment} />
          ))}
        </div>
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
