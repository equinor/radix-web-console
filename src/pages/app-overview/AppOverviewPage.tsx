import { Typography } from '@equinor/eds-core-react'
import { Alert } from '../../components/alert'
import ApplicationCost from '../../components/application-cost'
import { FutureApplicationCost } from '../../components/application-future-cost'
import AsyncResource from '../../components/async-resource/async-resource'
import { DefaultAppAlias } from '../../components/component/default-app-alias'
import { DNSAliases } from '../../components/component/dns-aliases'
import { EnvironmentsSummary } from '../../components/environments-summary'
import { JobsList } from '../../components/jobs-list'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { configVariables } from '../../utils/config'
import { withRouteParams } from '../../utils/router'

const LATEST_JOBS_LIMIT = 5

function AppOverviewPage({ appName }: { appName: string }) {
  const isPlayground =
    Object.values(configVariables.CLUSTERS).find(({ baseUrl }) => baseUrl === configVariables.RADIX_DNS_ZONE)
      ?.isPlayground ?? false

  const { data: application, ...state } = useGetApplicationQuery({ appName }, { skip: !appName, pollingInterval })

  const { appAlias, dnsAliases, dnsExternalAliases, jobs } = application ?? {}

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

        <div className="grid grid--gap-medium grid--overview-columns">
          <ApplicationCost appName={appName} />
          <FutureApplicationCost appName={appName} />
        </div>

        {appAlias && <DefaultAppAlias appName={appName} appAlias={appAlias} />}
        {dnsAliases && <DNSAliases appName={appName} dnsAliases={dnsAliases} title={'DNS aliases'} />}
        {DNSAliases && <DNSAliases appName={appName} dnsAliases={dnsExternalAliases} title={'DNS external aliases'} />}
        <span className="grid grid--gap-small">
          <Typography variant="h4">Environments</Typography>
          {application && <EnvironmentsSummary application={application} />}
        </span>
        <JobsList appName={appName} jobs={jobs} limit={LATEST_JOBS_LIMIT} />
      </AsyncResource>
    </main>
  )
}
export default withRouteParams(AppOverviewPage)
