import AppList from '../../components/app-list'
import { DocumentTitle } from '../../components/document-title'
import { TemporaryClusterMigrationBanner } from './components/TemporaryClusterMigrationBanner'

import './style.css'

export default function ApplicationsPage() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />
      <TemporaryClusterMigrationBanner className="temporary-migration-banner" />
      <AppList />
    </div>
  )
}
