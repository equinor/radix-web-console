import type { Application } from '../../store/radix-api'
import { Banner } from '../banner/Banner'
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link'
import { RadixConfigFileLink } from '../link/radix-config-file-link'

interface MissingRadixConfigAlertProps {
  application: Pick<Application, 'name' | 'registration'>
}

export const MissingRadixConfigAlert = ({ application }: MissingRadixConfigAlertProps) => (
  <Banner>
    <Banner.Message>
      The <RadixConfigFileLink registration={application.registration} /> file must be read by Radix in order to show
      information about environments.
      <br />
      Run the <NewApplyConfigPipelineLink appName={application.name}>apply-config</NewApplyConfigPipelineLink> pipeline
      job to read the file from the application's GitHub repository.
    </Banner.Message>
  </Banner>
)
