import { Icon, Typography } from '@equinor/eds-core-react'
import type { Application } from '../../store/radix-api'
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link'
import { EnvironmentCard } from './environment-card'
import './style.css'
import { info_circle } from '@equinor/eds-icons'
import { Alert } from '../alert'
import { RadixConfigFileLink } from '../link/radix-config-file-link'

export type EnvironmentsSummaryProps = {
  application: Application
}

export const EnvironmentsSummary = ({ application }: EnvironmentsSummaryProps) => {
  return (
    <>
      {application.environments && application.environments.length > 0 ? (
        <div className="environments-summary">
          {application.environments?.map((env, i) => (
            <EnvironmentCard
              key={i}
              appName={application.name}
              env={env}
              repository={application.registration?.repository}
            />
          ))}
        </div>
      ) : (
        <Alert className="icon">
          <Icon data={info_circle} color="primary" />
          <span className="grid grid--gap-x-small">
            <Typography>
              The <RadixConfigFileLink registration={application.registration} /> file must be read by Radix in order to
              show information about environments.
            </Typography>
            <Typography>
              Run the <NewApplyConfigPipelineLink appName={application.name}>apply-config</NewApplyConfigPipelineLink>{' '}
              pipeline job to read the file from the application's GitHub repository.
            </Typography>
          </span>
        </Alert>
      )}
    </>
  )
}
