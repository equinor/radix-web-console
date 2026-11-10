import { Typography } from '@equinor/eds-core-react'
import { Alert } from '../../components/alert'
import ApplicationCost from '../../components/application-cost'
import { FutureApplicationCost } from '../../components/application-future-cost'
import { ApplyConfigPromptPanelContainer } from '../../components/apply-config-prompt/components/panel/ApplyConfigPromptPanelContainer'
import AsyncResource from '../../components/async-resource/async-resource'
import { DefaultAppAlias } from '../../components/component/default-app-alias'
import { DNSAliases } from '../../components/component/dns-aliases'
import { EnvironmentCardList } from '../../components/environment-card-list/EnvironmentCardList'
import { PipelineJobsTable } from '../../components/pipeline-jobs-table/PipelineJobsTable'
import { hasAppliedRadixConfig } from '../../domain/radix-config/radixConfig.utils'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { configVariables } from '../../utils/config'
import { withRouteParams } from '../../utils/router'

const LATEST_JOBS_LIMIT = 5

interface AppOverviewPageProps {
  readonly appName: string
}

const AppOverviewPage = (props: AppOverviewPageProps) => {
  const { appName } = props

  const isPlayground =
    Object.values(configVariables.CLUSTERS).find(({ baseUrl }) => baseUrl === configVariables.RADIX_DNS_ZONE)
      ?.isPlayground ?? false

  const { data: application, ...state } = useGetApplicationQuery({ appName }, { skip: !appName, pollingInterval })

  const { appAlias, dnsAliases, dnsExternalAliases, jobs } = application ?? {}

  const hasAppliedConfig = application ? hasAppliedRadixConfig(application) : undefined
  // If no jobs exist, we haven't applied config yet. At this point, showing the pipeline jobs table would be premature.
  const shouldShowPipelineJobs = (jobs?.length ?? 0) > 0

  return (
    <main className="grid grid--gap-medium">
      <AsyncResource asyncState={state}>
        {isPlayground && (
          <Alert type="warning">
            <Typography>
              Applications in Playground that has not had any deployments or been restarted in the last 7 days will be
              stopped. The application will be automatically deleted after another 21 days of inactivity.
            </Typography>
          </Alert>
        )}

        {/* Until the Radix config is applied there is nothing else to show, so the onboarding panel takes the stage */}
        {application && hasAppliedConfig === false && <ApplyConfigPromptPanelContainer application={application} />}

        {hasAppliedConfig && (
          <div className="grid grid--gap-medium grid--overview-columns">
            <ApplicationCost appName={appName} />
            <FutureApplicationCost appName={appName} />
          </div>
        )}

        {appAlias && <DefaultAppAlias appName={appName} appAlias={appAlias} />}
        {dnsAliases && <DNSAliases appName={appName} dnsAliases={dnsAliases} title={'DNS aliases'} />}
        {DNSAliases && <DNSAliases appName={appName} dnsAliases={dnsExternalAliases} title={'DNS external aliases'} />}

        {application && hasAppliedConfig && (
          <div className="grid grid--gap-small">
            <Typography variant="h4">Environments</Typography>
            <EnvironmentCardList application={application} />
          </div>
        )}

        {shouldShowPipelineJobs && <PipelineJobsTable appName={appName} jobs={jobs} limit={LATEST_JOBS_LIMIT} />}
      </AsyncResource>
    </main>
  )
}
export default withRouteParams(AppOverviewPage)
