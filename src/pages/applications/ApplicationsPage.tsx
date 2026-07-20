import AppList from '../../components/app-list'
import { DocumentTitle } from '../../components/document-title'
import { TemporaryMigrationBanner } from './components/TemporaryMigrationBanner'

import './style.css'

export default function ApplicationsPage() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />
      <TemporaryMigrationBanner className="temporary-migration-banner" />
      <AppList />
    </div>
  )
}
