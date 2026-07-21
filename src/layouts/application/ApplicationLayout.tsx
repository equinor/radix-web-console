import { Typography } from '@equinor/eds-core-react'
import { Outlet } from 'react-router'
import { Alert } from '../../components/alert'
import { DocumentTitle } from '../../components/document-title'
import { LayoutApp } from '../../components/layout-app'
import { MigrateFederatedCredentialsBanner } from '../../components/migrateFederatedCredentialsBanner/MigrateFederatedCredentialsBanner'
import { pollingInterval } from '../../store/defaults'
import { useGetApplicationQuery } from '../../store/radix-api'
import { withRouteParams } from '../../utils/router'

export function ApplicationLayout({ appName }: { appName: string }) {
  const { data: application, isSuccess } = useGetApplicationQuery({ appName }, { pollingInterval })

  return (
    <LayoutApp appName={appName}>
      <DocumentTitle title={appName} />
      <div className="o-layout-constrained">
        {/** TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations. */}
        <MigrateFederatedCredentialsBanner currentApplication={appName} />

        {isSuccess && !application?.userIsAdmin && (
          <Alert type="warning">
            <Typography>You have read-only access to this application.</Typography>
          </Alert>
        )}

        <Outlet />
      </div>
    </LayoutApp>
  )
}

export default withRouteParams(ApplicationLayout)
