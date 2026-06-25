import AppList from '../../components/app-list'
import { DocumentTitle } from '../../components/document-title'

import './style.css'

export default function ApplicationsPage() {
  return (
    <div className="o-layout-single applications">
      <DocumentTitle title="Applications" />

      <AppList />
    </div>
  )
}
