import AppList from '../../components/app-list'
import { DocumentTitle } from '../../components/document-title'
import { MigrateFederatedCredentialsBanner } from '../../components/migrateFederatedCredentialsBanner/MigrateFederatedCredentialsBanner'

import './style.css'

export default function ApplicationsPage() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />
      {/* TODO: #1373 - This is a temporary solution and should be removed once the migration is complete and all users have updated their configurations. */}
      <MigrateFederatedCredentialsBanner className="temporary-migration-banner" />
      <AppList />
    </div>
  )
}
